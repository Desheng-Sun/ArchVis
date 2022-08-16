// import "./index"
// import '../../../App';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { firstArchList } from '../../../apis/api';

export default function FirstArchList() {
  const [data, setData] = useState([]);
  useEffect (() => {
    firstArchList("西南").then((res) => {
      // console.log(res)
      setData(res)
    })
  }, [])

  // const dataSource = [
  //   {
  //     key: '1',
  //     ticker: '000001',
  //     name: '平安银行股份有限公司',
  //     abbreviation: '平安银行',
  //     business: '银行',
  //   },
  //   {
  //     key: '2',
  //     ticker: '000002',
  //     name: '光电股份有限公司',
  //     abbreviation: '光电公司',
  //     business: '光电业务',
  //   },
  // ];

  const columns = [

    {
      title: '股票代码',
      dataIndex: '股票代码',
      key: '股票代码',
    },
    {
      title: '企业名称',
      dataIndex: '企业名称',
      key: '企业名称',
    },
    {
      title: '企业简称',
      dataIndex: '企业名称',
      key: '企业简称',
    },
    {
      title: '成立年份',
      dataIndex: '成立年份',
      key: '成立年份',
    },
    // {
    //   title: '主营业务',
    //   dataIndex: '主营业务',
    //   key: '主营业务',
    // },
  ];

  return (
    <div style={{ width: "100%", height: "51vh"}}>
      <Table 
        dataSource={data} 
        columns={columns}
        rowKey="股票代码"
        size="small"
        scroll={{y:'44.2vh'}}
        pagination={false}
      />
      
    </div>

  )
}