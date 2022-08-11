import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function FirstIndicators({w, h}) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {

  }, [data])
  // 随系统缩放修改画布大小
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
            trigger: 'axis'
          },
          legend: {
            top: '5%',
            data: ['企业1', '企业2', '企业3', '企业4', '企业5']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2019年', '2020年', '2021年']
          },
          yAxis: {
            type: 'value',
            max: (value) => {
                return value.max
              }
          },
          series: [
            {
              name: '企业1',
              type: 'line',
              data: [160, 132, 181]
            },
            {
              name: '企业2',
              type: 'line',
              data: [220, 182, 161]
            },
            {
              name: '企业3',
              type: 'line',
              
              data: [150, 332, 201]
            },
            {
              name: '企业4',
              type: 'line',
              data: [220, 312, 301]
            },
            {
              name: '企业5',
              type: 'line',
              data: [200, 332, 401]
            }
          ]
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "47.2vh" }}>
    </div>
  )
}