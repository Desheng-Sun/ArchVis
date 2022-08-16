// import "./index.css";

import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { firstArchRank } from '../../../apis/api';


export default function FirstArchRank({w, h}) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect (() => {
    firstArchRank("西南").then((res) => {
      // console.log(res)
      setData(res)
    })
  
  }, [])
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }

    //创建两个一维数组存储数据
    var names=[];
    var scores=[];
    for(let index in data){
      names.push(data[index].企业名称)
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
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      
      // dataset: [
      //   {
      //     dimensions: ['name', 'score', 'rank'],
      //     // source: [
      //     //   ['企业1', 41, 4],
      //     //   ['企业2', 20, 8],
      //     //   ['企业3', 52, 3],
      //     //   ['企业4', 37, 6],
      //     //   ['企业5', 25, 7],
      //     //   ['企业6', 19, 9],
      //     //   ['企业7', 71, 1],
      //     //   ['企业8', 36, 5],
      //     //   ['企业9', 67, 2],
      //     //   ['企业10', 67, 2]
      //     // ]
      //     source: data
      //   },
      //   {
      //     transform: {
      //       type: 'sort',
      //       config: { dimension: 'score', order: 'desc' }
      //     }
      //   }
      // ],
      xAxis: {
        type: 'category',
        name: '企业简称',
        data: names,       
        axisLabel: { interval: 0, rotate: 30 }
      },
      yAxis: {
        type:'value',
        name:'企业数字化综合得分'

      },
      series: {
        name: '得分',
        data: scores,
        type: 'bar',
        encode: { x: 'name', y: 'score' },
        datasetIndex: 1
      }
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "37.2vh" }}>
    </div>
  )
}