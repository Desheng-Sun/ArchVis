// import "./index.css";

import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { firstArchIndustry } from '../../../apis/api';

export default function FirstIndicators({w, h, selectdIndustry, selectedIndexFirst}) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    firstArchIndustry(selectdIndustry, selectedIndexFirst).then((res) =>{
      console.log(res)
      setData(res)
    })
  }, [selectdIndustry, selectedIndexFirst])

  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
      console.log(myChart)
    }
    // console.log(data)
    let drawdata = [];
    for (let i in data) {
      if (data[i].level === 1) {
        drawdata.push({
          name: data[i].indi_name,
          children: []
        })
      }
      else if (data[i].level === 2){
        drawdata[data[i].parent_id - 1].children.push({
          name: data[i].indi_name,
          value: 1
        })
      }
      else {
        break;
      }
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
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      series: [
        {
          type: 'sunburst',
          center: ['50%', '50%'],
          data: drawdata,
          label: {
            rotate: 'radial'
          },
          itemStyle: {
            borderColor: 'white',
            borderWidth: 2
          },
          levels: [
            {},
            {
              r0: 0,
              r: '50%',
              label: {
                rotate: 0,
                width: '50',
                overflow: 'break'
              }
            },
            {
              r0: '50%',
              r: '90%',
              label: {
                width: '70',
                overflow: 'break'
              }
            }
          ]
        }
      ]
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "61vh" }}>
    </div>
  )
}