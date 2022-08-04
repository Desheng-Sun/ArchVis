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
    var data = [
        {
          name: '规模状况',
          itemStyle: {
            color: '#da0d68'
          },
          children: [
            {
              name: '股票代码',
              value: 1,
              itemStyle: {
                color: '#975e6d'
              }
            },
            {
              name: '企业名称',
              value: 1,
              itemStyle: {
                color: '#e0719c'
              }
            },
            {
              name: '企业简介',
              value: 1,
              itemStyle: {
                color: '#975e6d'
              }
            },
            {
              name: '主营业务',
              value: 1,
              itemStyle: {
                color: '#e0719c'
              }
            },
            {
              name: '经营范围',
              value: 1,
              itemStyle: {
                color: '#975e6d'
              }
            },
            {
              name: '公司简介',
              value: 1,
              itemStyle: {
                color: '#e0719c'
              }
            },
            {
              name: '省份',
              value: 1,
              itemStyle: {
                color: '#975e6d'
              }
            },
            {
              name: '城市',
              value: 1,
              itemStyle: {
                color: '#e0719c'
              }
            },
            {
              name: '总资产',
              value: 1,
              itemStyle: {
                color: '#975e6d'
              }
            },
            {
              name: '企业成立年限',
              value: 1,
              itemStyle: {
                color: '#e0719c'
              }
            },
            {
              name: '成立年份',
              value: 1,
              itemStyle: {
                color: '#975e6d'
              }
            },
            {
              name: '员工总数',
              value: 1,
              itemStyle: {
                color: '#e0719c'
              }
            },
          ]
        },
        {
          name: '财务状况',
          itemStyle: {
            color: '#da1d23'
          },
          children: [
            {
              name: '资产负债率',
              value: 1,
              itemStyle: {
                color: '#dd4c51'
              }
            },
            {
              name: '总资产周转率',
              value: 1,
              itemStyle: {
                color: '#c94a44'
              }
            },
            {
              name: '净利润增长率',
              value: 1,
              itemStyle: {
                color: '#dd4c51'
              }
            },
            {
              name: '营业净利润率',
              value: 1,
              itemStyle: {
                color: '#f7a128'
              }
            }
          ]
        },
        {
          name: '研发状况',
          itemStyle: {
            color: '#ebb40f'
          },
          children: [
            {
              name: '研发投入费用',
              value: 1,
              itemStyle: {
                color: '#e1c315'
              }
            },
            {
              name: '研发投入占营\n业收入比例(%)',
              value: 1,
              itemStyle: {
                color: '#b09733'
              }
            },
            {
              name: '研发人员',
              value: 1,
              itemStyle: {
                color: '#e1c315'
              }
            },
            {
              name: '研发项目个数',
              value: 1,
              itemStyle: {
                color: '#b09733'
              }
            },
            {
              name: '专利数',
              value: 1,
              itemStyle: {
                color: '#e1c315'
              }
            },
            {
              name: '硕士及以上人员数量',
              value: 1,
              itemStyle: {
                color: '#b09733'
              }
            },
            {
              name: '国家级获奖',
              value: 1,
              itemStyle: {
                color: '#e1c315'
              }
            },
            {
              name: '研发中心数量',
              value: 1,
              itemStyle: {
                color: '#b09733'
              }
            }
          ]
        },
        {
          name: '数字化创新成果状况',
          itemStyle: {
            color: '#187a2f'
          },
          children: [
            {
              name: '数字化创新平台数',
              value: 1,
              itemStyle: {
                color: '#a2b029'
              }
            },
            {
              name: '互联网云平台运用数量',
              value: 1,
              itemStyle: {
                color: '#718933'
              }
            },
            {
              name: '数字化业务板块数',
              value: 1,
              itemStyle: {
                color: '#3aa255'
              }
            },
            {
              name: '联合高等院校\n课题研发数',
              value: 1,
              itemStyle: {
                color: '#5e9a80'
              }
            },
            {
              name: '成果转化数',
              value: 1,
              itemStyle: {
                color: '#5e9a80'
              }
            }
          ]
        },
        {
          name: '数字化技术\n应用状况',
          itemStyle: {
            color: '#0aa3b5'
          },
          children: [
            {
              name: '一级技术词频数',
              value: 1,
              itemStyle: {
                color: '#9db2b7'
              }
            },
            {
              name: '二级技术词频数',
              value: 1,
              itemStyle: {
                color: '#9db2b7'
              }
            },
            {
              name: '三级技术词频数',
              value: 1,
              itemStyle: {
                color: '#76c0cb'
              }
            }
          ]
        },
        {
          name: '组织结构',
          itemStyle: {
            color: '#c94930'
          },
          children: [
            {
              name: '业务板块数量\n(多元化情况)',
              value: 1,
              itemStyle: {
                color: '#caa465'
              }
            },
            {
              name: '组织内部是否具有\n专门的项目管理系统',
              value: 1,
              itemStyle: {
                color: '#dfbd7e'
              }
            }
          ]
        },
        {
          name: '承包联合体模式',
          itemStyle: {
            color: '#ad213e'
          },
          children: [
            {
              name: '是否与数字化类型\n的企业有合作、\n收购、投资关系',
              value: 1,
              itemStyle: {
                color: '#794752'
              }
            },
            {
              name: '是否为国家认定的\n高新技术企业',
              value: 1,
              itemStyle: {
                color: '#cc3d41'
              }
            }
          ]
        },
        {
          name: '企业战略规划',
          itemStyle: {
            color: '#a87b64'
          },
          children: [
            {
              name: '',
              // name: '企业年报中是否有提及\n数字化战略的相关内容',
              value: 1,
              itemStyle: {
                color: '#c78869'
              }
            },
            {
              name: '',
              // name: '企业年报中是否有\n专项数字化转型报告',
              value: 1,
              itemStyle: {
                color: '#bb764c'
              }
            }
          ]
        }
      ];
    const option = {
      title: {
        text: '二级指标细分',
        left: 'center'
      },
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
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
    </div>
  )
}