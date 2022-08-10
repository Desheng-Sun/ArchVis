import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function FirstIndicators({w, h}) {
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
    var data = [
        {
          name: '规模状况',
          itemStyle: {
            color: '#5b8ff9'
          },
          children: [
            {
              name: '股票代码',
              value: 1,
              itemStyle: {
                color: '#87b3ff'
              }
            },
            {
              name: '企业名称',
              value: 1,
              itemStyle: {
                color: '#d9e9ff'
              }
            },
            {
              name: '企业简介',
              value: 1,
              itemStyle: {
                color: '#b0d0ff'
              }
            },
            {
              name: '主营业务',
              value: 1,
              itemStyle: {
                color: '#f0f7ff'
              }
            },
            {
              name: '经营范围',
              value: 1,
              itemStyle: {
                color: '#87b3ff'
              }
            },
            {
              name: '公司简介',
              value: 1,
              itemStyle: {
                color: '#d9e9ff'
              }
            },
            {
              name: '省份',
              value: 1,
              itemStyle: {
                color: '#b0d0ff'
              }
            },
            {
              name: '城市',
              value: 1,
              itemStyle: {
                color: '#f0f7ff'
              }
            },
            {
              name: '总资产',
              value: 1,
              itemStyle: {
                color: '#87b3ff'
              }
            },
            {
              name: '企业成立年限',
              value: 1,
              itemStyle: {
                color: '#d9e9ff'
              }
            },
            {
              name: '成立年份',
              value: 1,
              itemStyle: {
                color: '#b0d0ff'
              }
            },
            {
              name: '员工总数',
              value: 1,
              itemStyle: {
                color: '#f0f7ff'
              }
            },
          ]
        },
        {
          name: '财务状况',
          itemStyle: {
            color: '#5ad8a6'
          },
          children: [
            {
              name: '资产负债率',
              value: 1,
              itemStyle: {
                color: '#42b389'
              }
            },
            {
              name: '总资产周转率',
              value: 1,
              itemStyle: {
                color: '#b3f2d5'
              }
            },
            {
              name: '净利润增长率',
              value: 1,
              itemStyle: {
                color: '#85e6bc'
              }
            },
            {
              name: '营业净利润率',
              value: 1,
              itemStyle: {
                color: '#e6fff2'
              }
            }
          ]
        },
        {
          name: '研发状况',
          itemStyle: {
            color: '#5d7092'
          },
          children: [
            {
              name: '研发投入费用',
              value: 1,
              itemStyle: {
                color: '#3f4e6b'
              }
            },
            {
              name: '研发投入占营\n业收入比例(%)',
              value: 1,
              itemStyle: {
                color: '#a1a5ab'
              }
            },
            {
              name: '研发人员',
              value: 1,
              itemStyle: {
                color: '#7e8b9e'
              }
            },
            {
              name: '研发项目个数',
              value: 1,
              itemStyle: {
                color: '#adb2b8'
              }
            },
            {
              name: '专利数',
              value: 1,
              itemStyle: {
                color: '#3f4e6b'
              }
            },
            {
              name: '硕士及以上人员数量',
              value: 1,
              itemStyle: {
                color: '#a1a5ab'
              }
            },
            {
              name: '国家级获奖',
              value: 1,
              itemStyle: {
                color: '#7e8b9e'
              }
            },
            {
              name: '研发中心数量',
              value: 1,
              itemStyle: {
                color: '#adb2b8'
              }
            }
          ]
        },
        {
          name: '数字化创新成果状况',
          itemStyle: {
            color: '#f6bd16'
          },
          children: [
            {
              name: '数字化创新平台数',
              value: 1,
              itemStyle: {
                color: '#ffd640'
              }
            },
            {
              name: '互联网云平台运用数量',
              value: 1,
              itemStyle: {
                color: '#ffef91'
              }
            },
            {
              name: '数字化业务板块数',
              value: 1,
              itemStyle: {
                color: '#ffe369'
              }
            },
            {
              name: '联合高等院校\n课题研发数',
              value: 1,
              itemStyle: {
                color: '#fff7ba'
              }
            },
            {
              name: '成果转化数',
              value: 1,
              itemStyle: {
                color: '#ffd640'
              }
            }
          ]
        },
        {
          name: '数字化技术\n应用状况',
          itemStyle: {
            color: '#e86452'
          },
          children: [
            {
              name: '一级技术词频数',
              value: 1,
              itemStyle: {
                color: '#c2453a'
              }
            },
            {
              name: '二级技术词频数',
              value: 1,
              itemStyle: {
                color: '#ffbaab'
              }
            },
            {
              name: '三级技术词频数',
              value: 1,
              itemStyle: {
                color: '#f58f7d'
              }
            }
          ]
        },
        {
          name: '组织结构',
          itemStyle: {
            color: '#6dc8ec'
          },
          children: [
            {
              name: '业务板块数量\n(多元化情况)',
              value: 1,
              itemStyle: {
                color: '#52a2c7'
              }
            },
            {
              name: '组织内部是否具有\n专门的项目管理系统',
              value: 1,
              itemStyle: {
                color: '#c7f3ff'
              }
            }
          ]
        },
        {
          name: '承包联合体模式',
          itemStyle: {
            color: '#945fb9'
          },
          children: [
            {
              name: '是否与数字化类型\n的企业有合作、\n收购、投资关系',
              value: 1,
              itemStyle: {
                color: '#704494'
              }
            },
            {
              name: '是否为国家认定的\n高新技术企业',
              value: 1,
              itemStyle: {
                color: '#c7b0d4'
              }
            }
          ]
        },
        {
          name: '企业战略规划',
          itemStyle: {
            color: '#ff9845'
          },
          children: [
            {
              name: '',
              // name: '企业年报中是否有提及\n数字化战略的相关内容',
              value: 1,
              itemStyle: {
                color: '#ffb46e'
              }
            },
            {
              name: '',
              // name: '企业年报中是否有\n专项数字化转型报告',
              value: 1,
              itemStyle: {
                color: '#ffe2bf'
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
      series: [
        {
          type: 'sunburst',
          id: 'echarts-package-size',
          radius: ['15%', '80%'],
          animationDurationUpdate: 1000,
          data: data,
          universalTransition: true,
          itemStyle: {
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.5)'
          },
          label: {
            show: true
          },
          levels: [
            {},
            {
              r0: '15%',
              r: '45%'
            },
            {
              r0: '45%',
              r: '60%',
              label: {
                position: 'outside'
              }
            }
          ]
        }
      ]
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "61vh" }}>
    </div>
  )
}