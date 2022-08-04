import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function FirstIndicators(w, h) {
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
        title: {
            text: '二、三级指标企业对比',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            top: '9%',
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
                console.log(value)
                return value.max
              }
          },
          series: [
            {
              name: '企业1',
              type: 'line',
              stack: 'Total',
              data: [160, 132, 181]
            },
            {
              name: '企业2',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 161]
            },
            {
              name: '企业3',
              type: 'line',
              stack: 'Total',
              data: [150, 332, 201]
            },
            {
              name: '企业4',
              type: 'line',
              stack: 'Total',
              data: [220, 312, 301]
            },
            {
              name: '企业5',
              type: 'line',
              stack: 'Total',
              data: [200, 332, 401]
            }
          ]
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
    </div>
  )
}