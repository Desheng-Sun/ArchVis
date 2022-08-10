// import {Table} from "antd";
// import "./index"
// import '../../../App';
import { Table } from 'antd';

export default function FirstArchList({w, h}) {
  const dataSource = [
    {
      key: '1',
      ticker: '000001',
      name: '平安银行股份有限公司',
      abbreviation:'平安银行',
      business: '银行',
    },
    {
      key: '2',
      ticker: '000002',
      name: '光电股份有限公司',
      abbreviation:'光电公司',
      business: '光电业务',
    },
  ];
  
  const columns = [
    {
      title: '',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '股票代码',
      dataIndex: 'ticker',
      key: 'ticker',
    },
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '企业简称',
      dataIndex: 'abbreviation',
      key: 'abbreviation',
    },
    {
      title: '主营业务',
      dataIndex: 'business',
      key: 'business',
    },
  ];

  return (
    <div style={{ height: "51vh"}}>
      <Table dataSource={dataSource} columns={columns} />
    </div>

  )
}