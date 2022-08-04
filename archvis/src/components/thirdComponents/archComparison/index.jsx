import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function ThirdArchComparison(w, h) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    const option = {
      title: {
        text: '企业数字化程度对比图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        bottom: 5
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2019年', '2020年', '2021年']
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '选中的企业',
          type: 'line',
          data: [7, 2, 6],
    
        },
        {
          name: '数字化程度最高企业',
          type: 'line',
          data: [10, 11, 13],
        },
        {
          name: '数字化程度最低企业',
          type: 'line',
          data: [1, 0, 2],
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