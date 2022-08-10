import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function ThirdEPScoreIndiND({w, h}) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
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
          name: 'Line 1',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90]
        },
        {
          name: 'Line 2',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220]
        },
        {
          name: 'Line 3',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190]
        },
        {
          name: 'Line 4',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190]
        },
        {
          name: 'Line 5',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210]
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