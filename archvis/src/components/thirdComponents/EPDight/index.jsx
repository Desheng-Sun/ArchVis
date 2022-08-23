import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { thirdEPdight } from '../../../apis/api';

export default function ThirdEPdight({w, h, selectedEnterprise, selectedIndustry}) {
  const [data, setData] = useState([]);
  const [industry, setIndustry] = useState('constru');
  const chartRef = useRef(null);
  useEffect(() => {
    if (selectedIndustry === '施工行业') {
      setIndustry('constru');
    }
    else if (selectedIndustry === '设计行业') {
      setIndustry('design');
    }
    
  }, [selectedIndustry])

  useEffect(() => {
    var scores=[];
    // console.log('selectedEnterprise');
    // console.log(selectedEnterprise);
    thirdEPdight(selectedEnterprise, industry).then((res) => {
      // console.log(res);
      for(let i in res){
        if(res[i]['年份'] == 2019){
          scores[0] = res[i]['资产负债率'];
        }
        else if(res[i]['年份'] == 2020){
          scores[1] = res[i]['资产负债率'];
        }
        else if(res[i]['年份'] == 2021){
          scores[2] = res[i]['资产负债率'];
        }
      }
      setData(scores)
    })
  }, [industry, selectedEnterprise])

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
          name: selectedEnterprise,
          type: 'line',
          data: data,
    
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
  }, [selectedEnterprise, data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "44.1vh" }}>
    </div>
  )
}