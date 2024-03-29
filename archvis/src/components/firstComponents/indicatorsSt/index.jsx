// import "./index.css";d

import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { firstArchIndustry } from '../../../apis/api';

export default function FirstIndicators({ w, h, selectdIndustryFirst, selectedIndexFirst }) {
  const [construData, setConstruData] = useState();
  const [designData, setDesignData] = useState();
  const [useData, setUseData] = useState();
  const chartRef = useRef(null);
  useEffect(() => {
    firstArchIndustry('constru').then((res) => {
      setConstruData(res);
    });
    firstArchIndustry('design').then((res) => {
      setDesignData(res);
    });
  }, [])

  useEffect(() => {
    if (construData && designData) {
      let nowData = {}
      for (let i of construData) {
        nowData[i.indi_name] = i
        nowData[i.indi_name]['industry'] = ['施工行业']
      }
      for (let i of designData) {
        if (nowData.hasOwnProperty(i.indi_name)) {
          nowData[i.indi_name]['industry'].push('设计行业')
        }
        else {
          nowData[i.indi_name] = i
          nowData[i.indi_name]['industry'] = ['设计行业']
        }
      }
      setUseData(nowData)
    }
  }, [construData, designData])


  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    let indexList =
    {
      "基本指标": 1,
      "数字研发创新指标": 2,
      "组织指标": 3,
      "战略指标": 4,
      "行业特色指标": 5
    }
    let useIndex = []
    for (let i of selectedIndexFirst) {
      useIndex.push(indexList[i])
    }
    let drawdata = [];
    const color = ["#008080", "#70a494", "#b4c8a8", "#edbb8a", "#f6edbd"];
    const colorChildren = ["#00a0a0", "#91c3b4", "#cce3be", "#ffd9b4", "#fffae2"];
    const colorTypeCon = '#f5efce';
    const colorTypeDes = '#fffae2';
    if (useData) {
      let nowUseData = {}
      for (let i in useData) {
        if (useData[i].level === 1) {
          nowUseData[useData[i].id] = {
            name: i,
            children: [],
            industry: useData[i].industry
          }
        }
        else if (useData[i].level === 2) {
          if(selectdIndustryFirst.includes(useData[i].industry[0]) || selectdIndustryFirst.includes(useData[i].industry[useData[i].industry.length - 1])){
            nowUseData[useData[i].parent_id].children.push({
              name: i,
              industry: useData[i].industry,
              value: 1
            })
          }
        }
      }
      for (let i in nowUseData) {
        if (useIndex.includes(parseInt(i))) {
          let addColor = nowUseData[i];
          addColor.itemStyle = {
            color: color[i - 1]
          };
          for (let j in addColor.children) {
            addColor.children[j].itemStyle = {
              color: colorChildren[i - 1]
            };
          }
          if ((i == 5) && (useIndex.includes(5)) && (selectdIndustryFirst.length == 2)) {
              for (let j in addColor.children) {
                if (addColor.children[j].industry == '施工行业') {
                  addColor.children[j].itemStyle = {
                    color: colorTypeCon
                  };
                }
                else if (addColor.children[j].industry == '设计行业') {
                  addColor.children[j].itemStyle = {
                    color: colorTypeDes
                  };
                }
            }
            drawdata.push(addColor)
          }
          else {
            // drawdata.push(nowUseData[i])
            drawdata.push(addColor)
          }
        }
      }
    }
    // for (let i in useData) {
    //   if (useDara[i].level === 1) {
    //     drawdata.push({
    //       name: data[i].indi_name,
    //       children: []
    //     })
    //   }
    //   else if (data[i].level === 2) {
    //     drawdata[data[i].parent_id - 1].children.push({
    //       name: data[i].indi_name,
    //       value: 1
    //     })
    //   }
    //   else {
    //     break;
    //   }
    // }
    
    const option = {
      color: [
        "#008080",
        "#70a494",
        "#b4c8a8",
        "#f6edbd",
        "#edbb8a",
        "#de8a5a",
        "#ca562c",
        "#39b185",
        "#bd925a",
        "#42b7b9"
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
          nodeClick: false,
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
  }, [selectdIndustryFirst, selectedIndexFirst, w, h, useData]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "56vh" }}>
    </div>
  )
}