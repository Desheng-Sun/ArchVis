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
    // console.log(data)
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
    const colorTypeBoth = '#5b8ff9';
    const colorTypeSpecial = '#f6bd16';
    const colorTypeCon = '#fff7ba';
    const colorTypeDes = '#ffe369';
    if (useData) {
      console.log('useData')
      console.log(useData)
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
      console.log('nowUsedata')
      console.log(nowUseData)
      for (let i in nowUseData) {
        if (useIndex.includes(parseInt(i))) {
          if ((useIndex.includes(5)) && (selectdIndustry.length == 2)) {
            let addColor = nowUseData[i];
            console.log('addColor');
            console.log(addColor);
            if ( i == 5 ) {
              addColor.itemStyle = {
                color: colorTypeSpecial
              };
              for (let j in addColor.children) {
                // if (addColor.children[j].industry.length == 2) {
                //   addColor.children[j].itemStyle = {
                //     color: colorTypeBoth
                //   };
                // }
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
            }
            // else {
            //   addColor.itemStyle = {
            //     color: colorTypeBoth
            //   };
            //   for (let j in addColor.children) {
            //     addColor.children[j].itemStyle = {
            //       color: '#87b3ff'
            //     };
            //   }
            // }
            drawdata.push(addColor)
          }
          else {
            drawdata.push(nowUseData[i])
          }
        }
      }
      console.log('drawdata')
      console.log(drawdata)
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
        "#5b8ff9",
        "#5ad8a6",
        "#5d7092",
        "#e86452",
        "#6dc8ec",
        "#945fb9",
        "#ff9845",
        "#1e9493",
        "#ff99c3",
        "#f6bd16"
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
    <div ref={chartRef} style={{ width: "100%", height: "61vh" }}>
    </div>
  )
}