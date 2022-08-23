// import "./index.css";
import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { firstArchRank } from '../../../apis/api';
export default function FirstArchRank({ w, h, selectedRegionFirst, selectedYearFirst }) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    firstArchRank(selectedRegionFirst, selectedYearFirst).then((res) => {
      setData(res)
    })
  }, [selectedRegionFirst, selectedYearFirst])
  
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }

    //创建两个一维数组存储数据
    var names = [];
    var scores = [];
    for (let index in data) {
      names.push(data[index].企业名称)
    }
    for (let index in data) {
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
      xAxis: {
        type: 'category',
        name: '企业简称',
        data: names,
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