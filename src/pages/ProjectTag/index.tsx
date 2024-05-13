import { projectTagFindAll } from '@/services/flowx-api/project';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';

const TableList: React.FC = () => {


  

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns = [
    {
      title: <FormattedMessage id="pages.projectTagTable.title" defaultMessage="Description" />,
      dataIndex: 'name',
      key: 'name'
    },
  ];

  return (
    <PageContainer>
      <ProTable<APIV2.ProjcetTagListItem, APIV2.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.projectTagTable.title',
          defaultMessage: 'Enquiry form',
        })}
        rowKey="id"
        request={async (params: any = {}) => projectTagFindAll(params)}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
