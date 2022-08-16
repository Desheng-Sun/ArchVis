import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { thirdEPdight } from '../../../apis/api';

export default function ThirdEPdight({w, h}) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    thirdEPdight("交建股份").then((res) => {
      setData(res)
    })
  }, [])

  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }

    //创建两个一维数组存储数据
    var years=[];
    var scores=[];
    for(let index in data){
      years.push(data[index].年份)
    }
    for(let index in data){
      scores.push(data[index].资产负债率)
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
          data: scores,
    
        },
        {
          name: '数字化程度最高企业',
          type: 'line',
          data: [0.9, 0.9, 1],
        },
        {
          name: '数字化程度最低企业',
          type: 'line',
          data: [0.1, 0, 0.1],
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