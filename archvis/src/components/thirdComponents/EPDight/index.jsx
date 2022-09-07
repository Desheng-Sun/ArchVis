import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { getArchScore } from '../../../apis/api';

export default function ThirdEPdight({w, h, selectedEnterprise, selectedIndustry}) {
  const [data, setData] = useState([]);
  const [max, setMax] = useState([]);
  const [min, setMin] = useState([]);
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
    getArchScore(industry).then((res) => {

      // 计算选中企业的数字化得分
      let scores = [];
      for(let i in res){
        for(let j in res[i]){
          if(j == selectedEnterprise){
            scores.push(res[i][j])
          }           
        }        
      }
      setData(scores)

      // 计算数字化得分最大值和最小值
      let tmp = {}
      let min = {}
      let max = {}
      let maxScore = [];
      let minScore = [];
      let maxName = [];
      let minName = [];
      for(let i in res){
        tmp[i] = []
        for(let j in res[i]){
          tmp[i].push(res[i][j])
        }
      }      
      for(let i in tmp){
        maxScore.push(Math.max(...tmp[i]))
        minScore.push(Math.min(...tmp[i]))
      }
      for(let i in res){
        for(let j in res[i]){
          if(maxScore[0] == res[i][j]){
            maxName[0] = j
          }
          else if(maxScore[1] == res[i][j]){
            maxName[1] = j
          }
          else if(maxScore[2] == res[i][j]){
            maxName[2] = j
          }

          if(minScore[0] == res[i][j]){
            minName[0] = j
          }
          else if(minScore[1] == res[i][j]){
            minName[1] = j
          }
          else if(minScore[2] == res[i][j]){
            minName[2] = j
          }

        }        
      }      
      max["name"] = maxName
      max["scores"] = maxScore
      min["name"] = minName
      min["scores"] = minScore
      setMax(max)
      setMin(min)    
    })

  }, [industry, selectedEnterprise])

  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }

    const option = {
      color: [
        "#f6bd16",
        "#5b8ff9",
        "#6dc8ec",
        "#5ad8a6",        
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
          name: '数字化程度最高值',
          type: 'line',
          data: max["scores"],
        },
        {
          name: '数字化程度最低值',
          type: 'line',
          data: min["scores"],
        }
      ]
    };
    myChart.setOption(option);
    myChart.resize();
  }, [selectedEnterprise, data, max, min, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "44.1vh" }}>
    </div>
  )
}