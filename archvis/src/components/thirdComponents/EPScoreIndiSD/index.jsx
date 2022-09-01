import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { thirdScoreST } from '../../../apis/api';
export default function ThirdEPScoreIndiSD({ w, h, selectedEnterprise, selectedIndustry}) {
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
    thirdScoreST(industry, selectedEnterprise).then((res) => {
      var tmp=[];   
      tmp[0]=[];
      tmp[1]=[];
      tmp[2]=[]; 
      for (let i of res){
        if (i["年份"] ==2019){
          tmp[0].push(i["资产负债率"]);
          tmp[0].push(i["总资产周转率"]);
          tmp[0].push(i["总资产周转率"]);
          tmp[0].push(i["资产负债率"]);
          tmp[0].push(i["资产负债率"]);
        }
        else if (i["年份"] ==2020){
          tmp[1].push(i['资产负债率']);
          tmp[1].push(i['总资产周转率']);
          tmp[1].push(i['总资产周转率']);
          tmp[1].push(i['资产负债率']);
          tmp[1].push(i['资产负债率']);
        }
        else if (i["年份"] ==2021){
          tmp[2].push(i['资产负债率']);
          tmp[2].push(i['总资产周转率']);
          tmp[2].push(i['总资产周转率']);
          tmp[2].push(i['资产负债率']);
          tmp[2].push(i['资产负债率']);
        }
      }
      setData(tmp)
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
      legend: {
        bottom: 5,
        data: [{
          name: selectedEnterprise+"2019年一级指标",
          icon: "circle"
        },
        {
          name: selectedEnterprise+"2020年一级指标",
          icon: "circle"
        },
        {
          name: selectedEnterprise+"2021年一级指标",
          icon: "circle"
        },

      ],
        itemGap: 20,
        textStyle: {
          color: '#aaa',
          fontSize: 14
        }
      },
      radar: {
        indicator: 
        [
          { name: '基本指标', max: 1 },
          { name: '数字化研发创新指标', max: 1 },
          { name: '组织指标', max: 1 },
          { name: '战略指标', max: 1 },
          { name: '行业特色指标', max: 1 }
        ]
      },
      series: [
        {
          name: 'score',
          type: 'radar',
          data: 
          [
            {
              value: data[0],
              name: selectedEnterprise+"2019年一级指标"
            },
            {
              value: data[1],
              name: selectedEnterprise+"2020年一级指标"
            },
            {
              value: data[2],
              name: selectedEnterprise+"2021年一级指标"
            },
          ]
        }
      ]
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h, selectedEnterprise]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "44.1vh" }}>
    </div>
  )
}