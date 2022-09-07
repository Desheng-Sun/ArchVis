import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { thirdIndicators, getThirdScore } from '../../../apis/api';
export default function ThirdEPScoreIndiSD({ w, h, selectedEnterprise, selectedIndustry}) {
  const [data, setData] = useState([]);
  const [score, setScore] = useState([]);
  const [industry, setIndustry] = useState('constru');
  const [indicators, setIndicators] = useState([]);
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
    getThirdScore(industry, selectedEnterprise).then((res) => {
      setScore(res)
    }, [industry, selectedEnterprise])
    thirdIndicators(industry).then((res) => {           
      // 所有的指标名
      setIndicators(res)       
    })
  }, [industry])

  useEffect(() => {
    let tmp ={}
    // 初始化
    for (let i in score){
      tmp[i] = []
      for (let j in indicators) {
        // if (indicators[j].level === 1) {
          tmp[i][indicators[j].indi_name] = []
        // }        
      }
    }   

    // 赋值三级指标
    for(let i in score){
      for(let j in score[i]){
        for(let x in indicators){
          if(indicators[x].level === 3 && indicators[x].indi_name.trim() == j){
            tmp[i][indicators[x].indi_name] = score[i][j]
          }          
        }
      }
      tmp[i]["股票代码"] = 0
      tmp[i]["企业名称"] = 0
      tmp[i]["成立年份"] = 0
      tmp[i]["年份"] = 0
    }   

    // 计算二级指标得分
    for(let i in score){
      for(let j in indicators){
        for(let x in indicators){
          if(indicators[x].level === 2 && indicators[x].id === indicators[j].parent_id){
            tmp[i][indicators[x].indi_name] = Number(tmp[i][indicators[x].indi_name])+Number(tmp[i][indicators[j].indi_name])
          }
        }        
      }
    }

    // 计算一级指标得分
    for(let i in score){
      for(let j in indicators){
        for(let x in indicators){
          if(indicators[x].level === 1 && indicators[x].id === indicators[j].parent_id){
            tmp[i][indicators[x].indi_name] = Number(tmp[i][indicators[x].indi_name])+Number(tmp[i][indicators[j].indi_name])
          }
        }        
      }
    }
    
    let datatmp = {}
    for(let i in tmp){
      datatmp[i] = []
      datatmp[i][0] = tmp[i]["基本指标"]
      datatmp[i][1] = tmp[i]["数字化研发创新指标"]
      datatmp[i][2] = tmp[i]["组织指标"]
      datatmp[i][3] = tmp[i]["战略指标"]
      datatmp[i][4] = tmp[i]["特色指标"]
      
    }
    console.log("tmp")
    console.log(datatmp)
    setData(datatmp)
  }, [score, indicators])

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
          { name: '基本指标', max: 0.3 },
          { name: '数字化研发创新指标', max: 0.3},
          { name: '组织指标', max: 0.3 },
          { name: '战略指标', max: 0.3 },
          { name: '行业特色指标', max: 0.3}
        ]
      },
      series: [
        {
          name: 'score',
          type: 'radar',          
          data: 
          [
            {
              value: data[2019],
              name: selectedEnterprise+"2019年一级指标"
            },
            {
              value: data[2020],
              name: selectedEnterprise+"2020年一级指标"
            },
            {
              value: data[2021],
              name: selectedEnterprise+"2021年一级指标"
            },
          ]
        },
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