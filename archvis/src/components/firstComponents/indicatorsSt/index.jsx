// import "./index.css";

import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function FirstIndicators(w, h) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {

  }, [data])
  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    const data = [
      {
        name: '基本指标',
        itemStyle: {
          color: '#5b8ff9'
        },
        children: [
          {
            name: '规模状况',
            value: 1,
            itemStyle: {
              color: '#87b3ff'
            }
          },
          {
            name: '财务状况',
            value: 1,
            itemStyle: {
              color: '#d9e9ff'
            }
          }
        ]
      },
      {
        name: '数字化研发创新指标',
        itemStyle: {
          color: "#5ad8a6"
        },
        children: [
          {
            name: '研发状况',
            value: 1,
            itemStyle: {
              color: '#42b389'
            }
          },
          {
            name: '数字化创新成果状况',
            value: 1,
            itemStyle: {
              color: '#b3f2d5'
            }
          },
          {
            name: '数字化技术应用状况',
            value: 1,
            itemStyle: {
              color: '#85e6bc'
            }
          }
        ]
      },
      {
        name: '组织指标',
        itemStyle: {
          color: "#5d7092"
        },
        children: [
          {
            name: '组织结构',
            value: 1,
            itemStyle: {
              color: '#3f4e6b'
            }
          },
          {
            name: '承包联合体模式',
            value: 1,
            itemStyle: {
              color: '#a1a5ab'
            }
          }
        ]
      },
      {
        name: '战略指标',
        itemStyle: {
          color: "#f6bd16"
        },
        children: [
          {
            name: '企业战略规划',
            value: 1,
            itemStyle: {
              color: '#ffd640'
            }
          },
          {
            name: '企业战略部门',
            value: 1,
            itemStyle: {
              color: '#ffef91'
            }
          },
          {
            name: '战略影响因素',
            value: 1,
            itemStyle: {
              color: '#ffe369'
            }
          }
        ]
      },
      {
        name: '特色指标(施工)',
        itemStyle: {
          color: "#e86452"
        },
        children: [
          {
            name: '装配式建筑',
            value: 1,
            itemStyle: {
              color: '#c2453a'
            }
          },
          {
            name: '智慧工地',
            value: 1,
            itemStyle: {
              color: '#ffbaab'
            }
          },
          {
            name: 'BIM应用',
            value: 1,
            itemStyle: {
              color: '#f58f7d'
            }
          },
          {
            name: '施工管理数字化',
            value: 1,
            itemStyle: {
              color: '#ffddd4'
            }
          },
          {
            name: '施工设施应用',
            value: 1,
            itemStyle: {
              color: '#c2453a'
            }
          }
        ]
      }
    ];
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
      title: {
        text: '一级指标概览',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          type: 'sunburst',
          center: ['50%', '52%'],
          data: data,
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
              r: '40%',
              label: {
                rotate: 0
              }
            },
            {
              r0: '40%',
              r: '90%'
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