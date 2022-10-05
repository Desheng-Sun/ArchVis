import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { thirdEPPos} from '../../../apis/api';

export default function ThirdEPPosplashes({ w, h, selectedIndustry, setNowEnterpriseThird, construScore, designScore, allDate }) {
  const [data, setData] = useState([]);
  const [allScore, setAllScore] = useState()
  const chartRef = useRef(null);
  const itemStyle = {
    opacity: 0.8,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: 'rgba(0,0,0,0.3)'
  };
  useEffect(() => {
    if (construScore && designScore) {
      let finalData = {}
      for (let i in construScore) {
        let nowFinalData = {}
        for (let index = 0; index < 2; index++) {
          let nowConstruData = []
          let nowConstruDData = []
          if (index === 0) {
            nowConstruData = construScore[i][0]
            nowConstruDData = construScore[i][1]
          }
          else {
            nowConstruData = designScore[i][0]
            nowConstruDData = designScore[i][1]
          }

          for (let j in nowConstruData["企业名称"]) {
            let nowEnterpriseName = nowConstruData["企业名称"][j]
            nowFinalData[nowEnterpriseName] = 0
            for (let k in nowConstruData) {
              if (k == "企业名称" || k == "股票代码" || k == "年份" || k == "成立年份") {
                continue
              }
              nowFinalData[nowEnterpriseName] += nowConstruData[k][j] * nowConstruDData[k] * 100
            }
          }
        }
        finalData[i] = nowFinalData
      }
      setAllScore(finalData)
    }
  }, [construScore, designScore])

  // 获取数据
  useEffect(() => {
    if (allScore) {
      let useData = {};
      let useIndusrty = ''
      if (selectedIndustry == "施工行业") {
        useIndusrty = 'constru'
      }
      else if (selectedIndustry == "设计行业") {
        useIndusrty = 'design'
      }
      thirdEPPos(useIndusrty).then((res) => {
        for (let i of res) {
          if (!useData.hasOwnProperty(i["年份"])) {
            useData[i["年份"]] = []
          }
          useData[i["年份"]].push([i["总资产"] / 100000000, allScore[i["年份"]][i["企业名称"]], i["企业名称"]])
        }
        let finalUseData = []
        for (let i of allDate) {
          finalUseData.push({
            name: i,
            type: 'scatter',
            itemStyle: itemStyle,
            data: useData[i],
            label: {
              show: true,
              position: 'top',
              color: '#000',
              formatter: function (param) {
                return param.value[2]
              }
            }
          })
        }
        setData(finalUseData);
      })
    }
  }, [selectedIndustry, allScore])

  // 随系统缩放修改画布大小
  useEffect(() => {
    if(data.length == 0){
      return 
    }
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    let useDate = []
    for(let i of allDate){
      useDate.push(i.toString())
    }
    <svg t="1663577285466" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4406" width="200" height="200"><path d="M436.992 735.04l45.312 45.248 361.984-361.984-90.496-90.56-271.488 271.552-135.808-135.744L256 554.048l180.992 180.992zM192 64h640a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128z" p-id="4407" fill="#1296db"></path></svg>
    const schema = ['规模', '数字化程度']
    const option = {
      color: [
        "#5b8ff9",
        "#5ad8a6",
        // "#5d7092",
        "#f6bd16",
        "#e86452",
        "#6dc8ec",
        "#945fb9",
        "#ff9845",
        "#1e9493",
        "#ff99c3"
      ],
      legend: {
        top: "1%",
        data: useDate,
        textStyle: {
          fontSize: 16
        },
        icon:"path://M436.992 735.04l45.312 45.248 361.984-361.984-90.496-90.56-271.488 271.552-135.808-135.744L256 554.048l180.992 180.992zM192 64h640a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128z",
        selected: {
          // 选中'系列1'
          "2019": false,
          "2020": false,
          "2021": true,
      }
      },
      grid: {
        left: '7%',
        right: '15%',
        top: '10%',
        bottom: '10%'
      },
      toolbox: {
        show: true,
        feature: {
          restore: {},
          // saveAsImage: {}
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        formatter: function (param) {
          var value = param.value;
          // prettier-ignore
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
            // param.seriesName
            + param.seriesName + "：" + value[2]
            + '</div>'
            + schema[0] + '：' + value[0] + '<br>'
            + schema[1] + '：' + value[1] + '<br>';
        }
      },
      xAxis: {
        type: 'value',
        name: '企业规模/亿',
        nameTextStyle: {
          fontSize: 15,
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }

      },
      yAxis: {
        type: 'value',
        name: '数字化程度\n（最终得分）',
        nameTextStyle: {
          fontSize: 15
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 1
        },
        {
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          right: '5%',
          bottom: '15%',
          top: '10%',
          start: 5,
          end: 30
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 0,
          end: 1
        },
        {
          type: 'inside',
          yAxisIndex: [0],
          start: 5,
          end: 30
        }
      ],
      series: data
    };
    option && myChart.setOption(option, true);

    // 鼠标点击获取企业名称
    myChart.on('click', function (param) {
      if (param.componentType === "series") {
        setNowEnterpriseThird(param.data[2]);
      }
    })

    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "61vh" }}>
    </div>
  )
}