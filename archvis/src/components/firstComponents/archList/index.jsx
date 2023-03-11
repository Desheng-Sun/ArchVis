import "./index.css"
// import '../../../App';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { firstArchList, firstArchRank } from '../../../apis/api';
import { use } from "echarts";

export default function FirstArchList({ selectedRegionFirst, selectedYearFirst, selectdIndustryFirst, setSelectedCompanyFirst}) {
  const [construData, setConstruData] = useState({});
  const [designData, setDesignData] = useState({});
  const [construInfo, setConstruInfo] = useState({});
  const [designInfo, setDesignInfo] = useState({});
  const [useData, setUseData] = useState([])
  useEffect(() => {
    firstArchList('constru').then((res) => {
      let useData = {}
      for (let i of res) {
        useData[i["企业名称"]] = i
      }
      setConstruInfo(useData)
    })
    firstArchList('design').then((res) => {
      let useData = {}
      for (let i of res) {
        useData[i["企业名称"]] = i
      }
      setDesignInfo(useData)
    })
  }, [])

  useEffect(() => {
    firstArchRank(selectedRegionFirst, selectedYearFirst, 'constru').then((res) => {
      let useData = {}
      for (let i of res) {
        useData[i["企业名称"]] = i
      }
      setConstruData(useData)
    })
    firstArchRank(selectedRegionFirst, selectedYearFirst, 'design').then((res) => {
      let useData = {}
      for (let i of res) {
        useData[i["企业名称"]] = i
      }
      setDesignData(useData)
    })
  }, [selectedRegionFirst, selectedYearFirst])

  useEffect(() => {
    if (construInfo && designInfo) {
      let useData = []
      if (selectdIndustryFirst.length === 2) {
        for (let i in construData) {
          construData[i]["主营业务"] = construInfo[i]["主营业务"]
          construData[i]["key"] = construData[i]["股票代码"]
          useData.push(construData[i])
        }
        for (let i in designData) {
          designData[i]["主营业务"] = designInfo[i]["主营业务"]
          designData[i]["key"] = designData[i]["股票代码"]
          useData.push(designData[i])
        }

      }
      else if (selectdIndustryFirst[0] === "施工行业") {
        for (let i in construData) {
          construData[i]["主营业务"] = construInfo[i]["主营业务"]
          construData[i]["key"] = construData[i]["股票代码"]
          useData.push(construData[i])
        }
      }
      else if (selectdIndustryFirst[0] === "设计行业") {
        for (let i in designData) {
          designData[i]["主营业务"] = designInfo[i]["主营业务"]
          designData[i]["key"] = designData[i]["股票代码"]
          useData.push(designData[i])
        }
      }
      setUseData(useData)
    }

  }, [construData, designData, construInfo, designInfo, selectdIndustryFirst])

  const columns = [
  {
    title: '股票代码',
    dataIndex: '股票代码',
    key:'股票代码',
    width:"15%"
  },
  {
    title: '企业名称',
    dataIndex: '企业名称',
    key: '企业名称',
    width:"15%"
  },
  {
    title: '主营业务',
    dataIndex: '主营业务',
    key: '企业名称',
  },
  {
    title: '成立年份',
    dataIndex: '成立年份',
    key: '企业名称',
    width:"15%"
  }
  ];

  return (
    <div id="industryList">
      <Table
        dataSource={useData}
        columns={columns}
        scroll={{ y: '46vh', x: '100%' }}
        pagination={false}
        onRow={record => {
          return {
            onClick: () => { setSelectedCompanyFirst(record.企业名称) }, // 点击行
          };
        }}
      />

    </div>

  )
}