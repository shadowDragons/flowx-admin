import { projectCreate, projectDelete, projectFindAll, projectTagSelect, projectUpdate } from '@/services/flowx-api/project';
import { PlusOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProTable,
  ProColumns,
  ModalForm,
  ProFormGroup,
  ProFormText,
  ProFormSelect,
  ActionType,
  FooterToolbar
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Form, Tag, message } from 'antd';
import { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import { skillSelect } from '@/services/flowx-api/skill';
import ProjectUpload from '@/components/Upload/ProjectUpload';
import { response } from 'express';
import { APIV2 } from '@/services/flowx-api/typings';

const Project: React.FC = () => {

  const [createForm] = Form.useForm<APIV2.CreateProjectDto>();
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<APIV2.UpdateProjectDto>();
  const [selectedRows, setSelectedRows] = useState<APIV2.ProjcetListItem[]>([]);
  const actionRef = useRef<ActionType>();

  /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
  const intl = useIntl();

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: APIV2.CreateProjectDto) => {
    const hide = message.loading(intl.formatMessage({
      id: 'pages.table.op.ing',
      defaultMessage: 'pages.table.op.ing',
    }));
    try {
        await projectCreate({
          title: fields.title,
          description: fields.description,
          tags: fields.tags,
          skills: fields.skills,
          imgs: fields.imgs
        });
        hide();
        message.success(intl.formatMessage({
          id: 'pages.table.op.success',
          defaultMessage: 'pages.table.op.success',
        }));
        return true;
    } catch (error) {
        hide();
        message.error(intl.formatMessage({
          id: 'pages.table.op.fail',
          defaultMessage: 'pages.table.op.fail',
        }));
        return false;
    }
  };

  /**
  * @en-US Update node
  * @zh-CN 更新节点
  *
  * @param fields
  */
  const handleUpdate = async (fields: APIV2.UpdateProjectDto) => {
    const hide = message.loading(intl.formatMessage({
      id: 'pages.table.op.ing',
      defaultMessage: 'pages.table.op.ing',
    }));
    try {
        await projectUpdate({
            id: fields.id,
            title: fields.title,
            description: fields.description,
            tags: fields.tags,
            skills: fields.skills,
            imgs: fields.imgs
        });
        hide();

        message.success(intl.formatMessage({
          id: 'pages.table.op.success',
          defaultMessage: 'pages.table.op.success',
        }));
        return true;
    } catch (error) {
        hide();
        message.error(intl.formatMessage({
          id: 'pages.table.op.fail',
          defaultMessage: 'pages.table.op.fail',
        }));
        return false;
    }
  };

  /**
  *  Delete node
  * @zh-CN 删除节点
  *
  * @param selectedRows
  */
  const handleRemove = async (ids: number[]) => {
    const hide = message.loading(intl.formatMessage({
      id: 'pages.table.op.ing',
      defaultMessage: 'pages.table.op.ing',
    }));
    if (!ids) return true;
    try {
        await projectDelete({
            ids: ids,
        });
        hide();
        message.success(intl.formatMessage({
          id: 'pages.table.op.success',
          defaultMessage: 'pages.table.op.success',
        }));
        return true;
    } catch (error) {
        hide();
        message.error(intl.formatMessage({
          id: 'pages.table.op.fail',
          defaultMessage: 'pages.table.op.fail',
        }));
        return false;
    }
  };

  const columns: ProColumns<APIV2.ProjcetListItem>[] = [
    {
      title: <FormattedMessage id="pages.projectTable.name" defaultMessage="Description" />,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: <FormattedMessage id="pages.projectTable.description" defaultMessage="Description" />,
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag key={tag.id}>
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'skills',
      key: 'skills',
      dataIndex: 'skills',
      render: (_, { skills }) => (
        <>
          {skills.map((skill) => {
            return (
              <Tag key={skill.id}>
                {skill.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: (
          <FormattedMessage id="pages.table.option" defaultMessage="Operating" />
      ),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const updateRecord = {
          ...record,
          ...{
            tags: record.tags.map((tag) => {
              return tag.id;
            }),
            skills: record.skills.map((skill) => {
              return skill.id;
            }),
            fileList: record.imgs.map((img) => {
              return {
                url: img.path,
                response: {
                  data: {
                    id: img.id
                  }
                }
              }
            })
          }
        }
        return [
          <a
              key="config"
              onClick={() => {
                  handleUpdateModalOpen(true);
                  setCurrentRow(updateRecord);
              }}
          >
              <FormattedMessage
                  id="pages.table.update"
                  defaultMessage="Configuration"
              />
          </a>,
          <a
              key="config"
              onClick={() => {
                  handleRemove([record.id]);
                  actionRef.current?.reloadAndRest?.();
              }}
          >
              <FormattedMessage id="pages.table.delete" defaultMessage="删除" />
          </a>,
      ]},
  },
  ];

  return (
    <PageContainer>
      <ProTable<APIV2.ProjcetListItem, APIV2.ProjectFindAllParams>
        actionRef={actionRef}
        headerTitle={intl.formatMessage({
          id: 'pages.projectTable.title',
          defaultMessage: 'pages.projectTable.title',
        })}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.table.new" defaultMessage="New" />
          </Button>,
        ]}
        rowKey="id"
        request={async (params) => {
          return await projectFindAll(params);
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.table.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRows.length}</a>{' '}
              <FormattedMessage id="pages.table.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRows.map((row) => row.id as number));
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.table.batchDeletion"
              defaultMessage="pages.table.batchDeletion"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm<APIV2.CreateProjectDto>
        form={createForm}
        title={intl.formatMessage({
            id: 'pages.table.new',
            defaultMessage: 'pages.table.new',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
            value.imgs = createForm.getFieldValue('imgs');
            const success = await handleAdd(value);
            if (success) {
                handleModalOpen(false);
                if (actionRef.current) {
                    actionRef.current.reload();
                }
            }
        }}
    >
        <ProFormGroup title={intl.formatMessage({
            id: 'pages.projectTable.name',
            defaultMessage: 'pages.projectTable.name',
        })}>
            <ProFormText width="md" name="title" />
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
            createForm.setFieldsValue({
              imgs: value
            });
          }}
          initValues={[]}
         />
    </ModalForm>
    <UpdateForm
        onSubmit={async (value : APIV2.UpdateProjectDto) => {
          console.log(value)
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow}
      />
    </PageContainer>
  );
};

export default Project;
