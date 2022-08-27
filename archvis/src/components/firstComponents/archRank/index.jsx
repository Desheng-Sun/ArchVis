// import "./index.css";
import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { firstArchRank } from '../../../apis/api';
export default function FirstArchRank({ w, h, selectedRegionFirst, selectedYearFirst, selectdIndustryFirst, selectedCompanyFirst }) {
  const [construData, setConstruData] = useState([]);
  const [designData, setDesignData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    firstArchRank(selectedRegionFirst, selectedYearFirst, 'constru').then((res) => {
      setConstruData(res)
    })
    firstArchRank(selectedRegionFirst, selectedYearFirst, 'design').then((res) => {
      setDesignData(res)
    })
  }, [selectedRegionFirst, selectedYearFirst])

  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }

    //存储数据的数组
    let useData = []
    // 获取当前需要展示的数据
    if (selectdIndustryFirst.length === 2) {
      for (let i of construData) {
        useData.push([i.企业名称, i.资产负债率, 1])
      }
      for (let i of designData) {
        useData.push([i.企业名称, i.资产负债率, 2])
      }
    }
    else if (selectdIndustryFirst[0] === "施工行业") {

      for (let i of construData) {
        useData.push([i.企业名称, i.资产负债率, 1])
      }
    }
    else if (selectdIndustryFirst[0] === "设计行业") {
      for (let i of designData) {
        useData.push([i.企业名称, i.资产负债率, 2])
      }
    }
    useData = useData.sort(function (a, b) { return a[0] > b[0] })

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        name: '企业简称',
        axisLabel: {
          interval: 0,
          rotate: 90
        }
      },
      yAxis: {
        type: 'value',
        name: '企业数字化综合得分'
      },
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: 0,
          start: 0,
          end: 100,
        }
      ],
      series: {
        name: '得分',
        data: useData,
        type: 'bar',
        encode: { x: 'name', y: 'score' },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        itemStyle: {
          color: function (param) {
            if (param.value[0] === selectedCompanyFirst) {
              return '#e86452'
            }
            else if (param.value[2] === 1) {
              return '#5b8ff9'
            }
            else if (param.value[2] === 2) {
              return '#6dc8ec'
            }
          }
        }
      }
    };
    myChart.setOption(option);
    myChart.resize();
  }, [construData, designData, selectdIndustryFirst, selectedCompanyFirst, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "37.2vh" }}>
    </div>
  )
}