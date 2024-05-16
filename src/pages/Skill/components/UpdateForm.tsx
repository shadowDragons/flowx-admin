import {
  ProFormText,
  ModalForm,
  ProFormGroup,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
// import { useIntl } from 'umi';
import { Form } from 'antd';

// import { uploadMedia, getMedia } from '@/services/api/file';
export type FormValueType = {
  name?: string
} & Partial<APIV2.SkillListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: any;
};



const UpdateForm = (props: any) => {
  //   const intl = useIntl();
  const { updateModalOpen, children, onCancel, values } = props;
  const [form] = Form.useForm<{ name: string; company: string }>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();


  if (!updateModalOpen) {
      return null;
  }
  return (
      <ModalForm<{
          name: string;
          company: string;
      }>
          title={intl.formatMessage({
            id: 'pages.table.update',
            defaultMessage: 'pages.table.update',
        })}
          form={form}
          initialValues={values}
          visible={updateModalOpen}
          autoFocusFirstInput
          trigger={<>{children}</>}
          modalProps={{
              destroyOnClose: true,
              onCancel: () => {
                  onCancel();
              },
          }}
          submitTimeout={2000}
          onFinish={props.onSubmit}
      >
          <ProFormGroup title={intl.formatMessage({
            id: 'pages.skillTable.name',
            defaultMessage: 'pages.skillTable.name',
        })}>
              <ProFormText width="md" name="name" />
              <ProFormText hidden width="md" name="id" />
          </ProFormGroup>
      </ModalForm>
  );
};

export default UpdateForm;
