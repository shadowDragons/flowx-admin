import { projectTagCreate, projectTagDelete, projectTagFindAll, projectTagUpdate } from '@/services/flowx-api/project';
import { PlusOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProTable,
  ProColumns,
  ModalForm,
  ProFormGroup,
  ProFormText,
  ActionType,
  FooterToolbar
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';

const ProjectTag: React.FC = () => {

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
const [currentRow, setCurrentRow] = useState<APIV2.ProjcetTagListItem>();
const [selectedRows, setSelectedRows] = useState<APIV2.ProjcetTagListItem[]>([]);
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
const handleAdd = async (fields: APIV2.ProjcetTagListItem) => {
  const hide = message.loading(intl.formatMessage({
    id: 'pages.table.op.ing',
    defaultMessage: 'pages.table.op.ing',
  }));
  try {
      await projectTagCreate({
        name: fields.name
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
const handleUpdate = async (fields: APIV2.ProjcetTagListItem) => {
  const hide = message.loading(intl.formatMessage({
    id: 'pages.table.op.ing',
    defaultMessage: 'pages.table.op.ing',
  }));
  try {
      await projectTagUpdate({
          id: fields.id,
          name: fields.name
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
      await projectTagDelete({
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
  

  

  const columns: ProColumns<APIV2.ProjcetTagListItem>[] = [
    {
      title: <FormattedMessage id="pages.projectTagTable.title" defaultMessage="Description" />,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: (
          <FormattedMessage id="pages.table.option" defaultMessage="Operating" />
      ),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
          <a
              key="config"
              onClick={() => {
                  setCurrentRow(record);
                  handleUpdateModalOpen(true);
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
      ],
  },
  ];

  return (
    <PageContainer>
      <ProTable<APIV2.ProjcetTagListItem, APIV2.ProjectTagFindAllParams>
        actionRef={actionRef}
        headerTitle={intl.formatMessage({
          id: 'pages.projectTagTable.title',
          defaultMessage: 'pages.projectTagTable.title',
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
          return await projectTagFindAll(params);
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
      
      <ModalForm<APIV2.ProjcetTagListItem>
        title={intl.formatMessage({
            id: 'pages.table.new',
            defaultMessage: 'pages.table.new',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        destroyOnClose={true}
        onFinish={async (value) => {
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
            id: 'pages.projectTagTable.name',
            defaultMessage: 'pages.projectTagTable.name',
        })}>
            <ProFormText width="md" name="name" />
        </ProFormGroup>
    </ModalForm>
    <UpdateForm
        onSubmit={async (value : APIV2.ProjcetTagListItem) => {
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
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default ProjectTag;
