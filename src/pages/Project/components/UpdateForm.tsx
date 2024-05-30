import ProjectUpload from '@/components/Upload/ProjectUpload';
import { projectTagSelect } from '@/services/flowx-api/project';
import { skillSelect } from '@/services/flowx-api/skill';
import { APIV2 } from '@/services/flowx-api/typings';
import {
  ProFormText,
  ModalForm,
  ProFormGroup,
  ProFormSelect
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
// import { useIntl } from 'umi';
import { Form } from 'antd';

// import { uploadMedia, getMedia } from '@/services/api/file';

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: APIV2.UpdateProjectDto) => void;
  onSubmit: (values: APIV2.UpdateProjectDto) => Promise<void>;
  updateModalOpen: boolean;
  values: APIV2.UpdateProjectDto | undefined;
};



const UpdateForm = (props: UpdateFormProps) => {
  //   const intl = useIntl();
  const { updateModalOpen, onCancel, values, onSubmit } = props;
  const [form] = Form.useForm<APIV2.UpdateProjectDto>();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();


  if (!updateModalOpen) {
      return null;
  }
  return (
      <ModalForm<APIV2.UpdateProjectDto>
          title={intl.formatMessage({
            id: 'pages.table.update',
            defaultMessage: 'pages.table.update',
        })}
          form={form}
          initialValues={values}
          visible={updateModalOpen}
          autoFocusFirstInput
          modalProps={{
              destroyOnClose: true,
              onCancel: () => {
                  onCancel();
              },
          }}

          submitTimeout={2000}
          onFinish={async (value)=> {
              const imgs = props.values?.imgs ? props.values.imgs.map((item)=> {
                return item.id;
              }) : [];
              value.imgs = imgs;
              onSubmit(value);
            }
          }
      >
          <ProFormGroup title={intl.formatMessage({
            id: 'pages.projectTagTable.name',
            defaultMessage: 'pages.projectTagTable.name',
        })}>
              <ProFormText width="md" name="title" />
              <ProFormText hidden width="md" name="id" />
          </ProFormGroup>
          <ProFormGroup title={intl.formatMessage({
            id: 'pages.projectTable.description',
            defaultMessage: 'pages.projectTable.description',
        })}>
              <ProFormText width="md" name="description" />
          </ProFormGroup>
          <ProFormSelect
          name="tags"
          mode="multiple"
          allowClear
          label={intl.formatMessage({
            id: 'pages.projectTable.tags',
            defaultMessage: 'pages.projectTable.tags',
        })}
          request={async () => await projectTagSelect()}
          placeholder="请选择标签"
          rules={[{ required: true, message: '请选择标签' }]}
        />
        <ProFormSelect
          name="skills"
          mode="multiple"
          allowClear
          label={intl.formatMessage({
            id: 'pages.projectTable.skills',
            defaultMessage: 'pages.projectTable.skills',
        })}
          request={async () => await skillSelect()}
          placeholder="请选择技能"
          rules={[{ required: true, message: '请选择技能' }]}
        />
        <ProjectUpload 
          uploadAction="http://localhost:3100/api/file/upload-project-img"
          onUploadSuccess={(value) => {
            form.setFieldsValue({
              imgs: value
            });
          }}
          initValues={values?.fileList}
         />
      </ModalForm>
  );
};

export default UpdateForm;
