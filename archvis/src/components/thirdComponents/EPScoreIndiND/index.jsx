import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { thirdIndicators, getThirdScore } from '../../../apis/api';
export default function ThirdEPScoreIndiND({w, h, selectedEnterprise, selectedIndustry}) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const [score, setScore] = useState([]);
  const [industry, setIndustry] = useState('constru');
  const [indicators, setIndicators] = useState([]);
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
    console.log("score")
    console.log(score)  
    console.log(indicators)
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

    // 计算二级指标的占比
    for(let i in score){
      for(let j in indicators){        
        for(let x in indicators){
          if(indicators[j].level === 2 && indicators[x].id === indicators[j].parent_id){
            if(tmp[i][indicators[x].indi_name]==0){
              tmp[i][indicators[j].indi_name]=0
            }
            else{
              tmp[i][indicators[j].indi_name] = Number(tmp[i][indicators[j].indi_name])/Number(tmp[i][indicators[x].indi_name])
            }
          }
        }        
      }
    }
    // console.log("tmp")
    // console.log(tmp)
    
    let datatmp = {}
    for(let i in tmp){
      datatmp[i] = {}
      for(let j in indicators){
        if(indicators[j].level === 1){
          datatmp[i][indicators[j].indi_name]=[]  
          for(let x in indicators){
            if(indicators[x].level === 2 && indicators[x].parent_id === indicators[j].id){
              datatmp[i][indicators[j].indi_name][indicators[x].indi_name]=tmp[i][indicators[x].indi_name]
            }
          }        
        }   
      }      
    }
    console.log("tmp")
    console.log(datatmp)
    let  data ={}
    
    // 初始化
    for(let i in datatmp){
      data[i]=[]
      for(let j in datatmp[i]){
        for(let x in datatmp[i][j]){
          data[i][x]=['-', '-', '-', '-', '-',]          
        }        
      }
    }

    // 赋值
    let datatt={}
    

    for(let i in datatmp){
      datatt[i]=[]
      let d = 0;
      for(let j in datatmp[i]){              
        datatt[i][d] = datatmp[i][j]
        d++
      }
    }
    console.log("data12345")
    console.log(datatt)
    for(let i in datatt){      
      for(let j in datatt[i]){ 
        for(let n in data[i]){
          // if(data[i][n]==datatt[i][j]){
            data[i][n][j]=datatt[i][j][n]
          // }
        }          
        
      }
    }
    for(let i in data){
      for(let j in data[i]){
        for(let n in data[i][j]){
          if(data[i][j][n] === undefined){
            data[i][j][n] = '-'
          }
        }
      }
    }
    console.log("data")
    console.log(data)


    setData(data)
  }, [score, indicators])

  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    console.log("dat11a")
    console.log(data[2019]['BIM应用'])

    
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
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        formatter: function (params) {
          let list=[];
          let listItem = ''
          for(var i=0; i<params.length;i++){
    
            if(params[i].value !== '-' ){
              list.push('<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                     params[i].color +';margin-right: 5px;border-radius: 50%;}"></i><span style=" display:inline-block;">'+params[i].seriesName+ ' : ' + params[i].value)
            }
          }
          listItem =list.join('<br>')
          return listItem
        }
      },
      // legend: {
      //   top: 25,
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
        }
      ],
      yAxis: [
        {
          type: 'category',
          // boundaryGap: false,
          data: ['基本指标', '数字化研发创新指标', '组织指标', '战略指标', '特色指标']
        
        }
      ],
      series: [
        {
          name: 'BIM应用',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['BIM应用']
          // data: data
        },
        {
          name: '企业战略规划',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['企业战略规划']
        },
        {
          name: '企业战略部门',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['企业战略部门']
        },
        {
          name: '战略影响因素',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['战略影响因素']
        },
        {
          name: '承包联合体模式',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['承包联合体模式']
        },
        {
          name: '数字化创新成果状况',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['数字化创新成果状况']
        },
        {
          name: '数字化技术应用状况',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['数字化技术应用状况']
        },
        {
          name: '施工管理数字化',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['施工管理数字化']
        },
        {
          name: '施工设施应用',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['施工设施应用']
        },
        {
          name: '智慧工地',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['智慧工地']
        },{
          name: '研发状况',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data:data[2019]['研发状况']
        }
        ,
        {
          name: '组织结构',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['组织结构']
        },
        {
          name: '装配式建筑',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['装配式建筑']
        },
        {
          name: '规模状况',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['规模状况']
        },
        {
          name: '财务状况',
          type: 'bar',
          stack: 'Total',
          label:{
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data[2019]['财务状况']
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