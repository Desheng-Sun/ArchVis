import "./index.css"
// import '../../../App';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { firstArchList } from '../../../apis/api';

export default function FirstArchList({ selectedRegionFirst, selectedYearFirst, selectdIndustryFirst, setSelectedCompanyFirst }) {
  const [construData, setConstruData] = useState([]);
  const [designData, setDesignData] = useState([]);
  const [useData, setUseData] = useState([])
  const Business = {
    'A': '智能塔吊',
    'B': '智能穿戴',
    'C': '人脸识别',
    'D': '3D打印',
    'E': '智能盾构机',
    'F': '智能推土机',
    'G': '智能挖掘机'
  }
  useEffect(() => {
    firstArchList(selectedRegionFirst, selectedYearFirst, 'constru').then((res) => {
      setConstruData(res)
    })
    firstArchList(selectedRegionFirst, selectedYearFirst, 'design').then((res) => {
      setDesignData(res)
    })
  }, [selectedRegionFirst, selectedYearFirst])

  useEffect(() => {
    //存储数据的数组
    // 获取当前需要展示的数据
    // let nowUseData = []
    if (construData.length > 0 || designData.length > 0) {
      if (selectdIndustryFirst.length === 2) {
        // for(let i of construData){
        //   let nowBusiness = []
        //   nowUseData.push({
        //     "股票代码": i.股票代码,

        //   })
        // }
        if (construData.length === 0) {
          setUseData(designData)
        }
        else if (designData.length === 0) {
          setUseData(construData)
        }
        else {
          setUseData(construData.concat(designData))
        }
      }
      else if (selectdIndustryFirst[0] === "施工行业") {
        setUseData(construData)
      }
      else if (selectdIndustryFirst[0] === "设计行业") {
        setUseData(designData)
      }
    }
    else {
      setUseData([])
    }
  }, [construData, designData, selectdIndustryFirst])

  const columns = [{
    title: '企业名称',
    dataIndex: '企业名称',
    key: '企业名称',
    fixed: 'left',
  },
  {
    title: '股票代码',
    dataIndex: '股票代码',
    key: '股票代码',

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
  }
  ];

  return (
    <div id="industryList">
      <Table
        dataSource={useData}
        columns={columns}
        rowKey="股票代码"
        size="small"
        scroll={{ y: '46vh', x: '100%' }}
        pagination={false}
        onRow={record => {
          return {
            onClick: event => { setSelectedCompanyFirst(record.企业名称) }, // 点击行
          };
        }}
      />

    </div>

  )
}