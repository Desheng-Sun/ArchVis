import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function ThirdIndicatorsRadar(w, h) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    const option = {
      title: {
        text: '企业一级指标得分'
      },
      legend: {
        bottom: 5,
        data: ['得分'],
        itemGap: 20,
        textStyle: {
          color: '#aaa',
          fontSize: 14
        }
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '基本指标', max: 6500 },
          { name: '数字化研发创新指标', max: 16000 },
          { name: '组织指标', max: 30000 },
          { name: '战略指标', max: 38000 },
          { name: '行业特色指标', max: 52000 }
        ]
      },
      series: [
        {
          name: 'score',
          type: 'radar',
          data: [
            {
              value: [5000, 14000, 28000, 26000, 42000],
              name: '得分'
            }
          ]
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