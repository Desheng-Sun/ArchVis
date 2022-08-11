import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function ThirdEPScoreIndiSD({ w, h }) {
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
      legend: {
        bottom: 5,
        data: [{
          name: '得分',
          icon: "circle"
        },
        {
          name: '得分2',
          icon: "circle"
        }],
        itemGap: 20,
        textStyle: {
          color: '#aaa',
          fontSize: 14
        }
      },
      radar: {
        indicator: [
          { name: '基本指标', max: 65 },
          { name: '数字化研发创新指标', max: 160 },
          { name: '组织指标', max: 300 },
          { name: '战略指标', max: 380 },
          { name: '行业特色指标', max: 520 }
        ]
      },
      series: [
        {
          name: 'score',
          type: 'radar',
          data: [
            {
              value: [50, 140, 280, 260, 420],
              name: '得分'
            },
            {
              value: [5, 14, 80, 20, 20],
              name: '得分2'
            }
          ]
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