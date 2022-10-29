import CheckableTag from 'antd/lib/tag/CheckableTag';
import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { secondProperty } from '../../../apis/api';

export default function SecondIndiRDRank({ w, h, selectedIndustrySecond, nowEnterprise, selectedIndicatorsNd, selectedIndicatorsRd, allDate }) {
  const [data, setData] = useState([]);
  const [industry, setIndustry] = useState('constru');
  const chartRef = useRef(null);
  useEffect(() => {
    if (selectedIndustrySecond === '施工行业') {
      setIndustry('constru');
    }
    else if (selectedIndustrySecond === '设计行业') {
      setIndustry('design');
    }
  }, [selectedIndustrySecond])
  useEffect(() => {
    if (selectedIndicatorsRd === undefined) {
      return
    }
    secondProperty(industry, selectedIndicatorsRd, nowEnterprise).then((res) => {
      let useDataTemp = {}
      console.log(res)
      for (let i of res) {
        if (!useDataTemp.hasOwnProperty(i["企业名称"])) {
          useDataTemp[i["企业名称"]] = {}
        }
        useDataTemp[i["企业名称"]][i["年份"]] = i[selectedIndicatorsRd]
      }
      let nowUseData = []
      for (let i in useDataTemp) {
        let nowData = []
        for(let j of allDate){
          nowData.push(useDataTemp[i][j])
        }
        nowUseData.push({
          name: i,
          type: "line",
          data: nowData
        })
      }
      setData(nowUseData);
    })
  }, [industry, nowEnterprise, selectedIndicatorsNd, selectedIndicatorsRd])
  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: '5%',
        data: data.name
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: allDate
      },
      yAxis: {
        type: 'value',
        max: (value) => {
          return value.max
        }
      },
      series: data
    };
    myChart.setOption(option, true);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "61vh" }}>
    </div>
  )
}