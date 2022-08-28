import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { thirdScoreND } from '../../../apis/api';
export default function ThirdEPScoreIndiND({w, h, selectedEnterprise, selectedIndustry, selectedYear}) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const [industry, setIndustry] = useState('constru');
  useEffect(() => {
    if (selectedIndustry === '施工行业') {
      setIndustry('constru');
    }
    else if (selectedIndustry === '设计行业') {
      setIndustry('design');
    }
  }, [selectedIndustry])
  useEffect(() => {
    thirdScoreND(industry, selectedEnterprise, selectedYear).then((res) => {
      var tmp=[];    
      console.log(res[0]['资产负债率']);
      tmp[0] = res[0]['资产负债率'];
      tmp[1] = res[0]['总资产周转率'];
      tmp[2] = res[0]['研发投入占营业收入比例(%)'];
      tmp[3] = res[0]['资产负债率'];
      tmp[4] = res[0]['资产负债率'];
      setData(tmp)
    })
  }, [industry, selectedEnterprise, selectedYear])

  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    const option = {
      color: [
        "#5b8ff9",
        "#5ad8a6",
        "#5d7092",
        "#f6bd16",
        "#e86452",
        "#6dc8ec",
        "#945fb9",
        "#ff9845",
        "#1e9493",
        "#ff99c3"
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        }
      },
      legend: {
        top: 25,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
        }
      ],
      yAxis: [
        {
          type: 'category',
          // boundaryGap: false,
          data: ['基本指标', '数字化研发创新指标', '组织指标', '战略指标', '特色指标']
        
        }
      ],
      series: [
        {
          name: '某二级指标',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          // data: [140, 232, 101, 264, 90]
          data: data
        },
        {
          name: '某二级指标 2',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [1.20, 2.82, 1.11, 2.34, 2.20]
        },
        {
          name: '某二级指标 3',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [3.20, 0.132, 2.01, 3.34, 1.90]
        },
        {
          name: '某二级指标 4',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [2.20, 4.02, 2.31, 1.34, 1.90]
        },
        {
          name: '某二级指标 5',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [2.20, 3.02, 1.81, 2.34, 2.10]
        }
      ]
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);
  return (
    <div ref={chartRef} style={{ width: "100%", height: "44.1vh" }}>
    </div>
  )
}