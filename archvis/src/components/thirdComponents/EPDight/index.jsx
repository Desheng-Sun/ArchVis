import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function ThirdEPdight({ w, h, selectedIndustry, selectedEnterprise, construScore, designScore, allDate }) {
  const [allScore, setAllScore] = useState()
  const [maxScore, setMaxScore] = useState()
  const [minScore, setMinScore] = useState()
  const chartRef = useRef(null);

  useEffect(() => {
    if (construScore && designScore) {
      let finalData = {}
      let nowMaxScore = {}
      let nowMinScore = {}
      for (let i in construScore) {
        let nowFinalData = {}
        nowMaxScore[i] = [0, "", 0, ""]
        nowMinScore[i] = [10, "", 10, ""]
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
            if (nowFinalData[nowEnterpriseName] > nowMaxScore[i][index * 2]) {
              nowMaxScore[i][index * 2] = nowFinalData[nowEnterpriseName]
              nowMaxScore[i][index * 2 + 1] = nowEnterpriseName
            }
            if (nowFinalData[nowEnterpriseName] < nowMinScore[i][index * 2]) {
              nowMinScore[i][index * 2] = nowFinalData[nowEnterpriseName]
              nowMinScore[i][index * 2 + 1] = nowEnterpriseName
            }
          }
        }
        finalData[i] = nowFinalData
      }
      setMaxScore(nowMaxScore)
      setMinScore(nowMinScore)
      setAllScore(finalData)
    }
  }, [construScore, designScore])

  useEffect(() => {
    if (!allScore) {
      return
    }
    let industryIndex = 0
    if (selectedIndustry == "施工行业") {
      industryIndex = 0
    }
    else if (selectedIndustry == "设计行业") {
      industryIndex = 1
    }
    let nowData = []
    let maxData = []
    let minData = []
    for (let i of allDate) {
      nowData.push(allScore[i][selectedEnterprise])
      maxData.push(maxScore[i][industryIndex * 2])
      minData.push(minScore[i][industryIndex * 2])
    }
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
        trigger: 'axis',
      },
      legend: {
        top: "1%",
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '年份',
        data: allDate
      },
      yAxis: {
        type: 'value',
        name: '数字化程度\n(最终得分)',
      },
      series: [
        {
          name: selectedEnterprise,
          type: 'line',
          data: nowData,
          areaStyle: {
            opacity: 0.5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)'
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }
            ])
          },
        },
        {
          name: '数字化程度最高值',
          type: 'line',
          data: maxData,
          opacity: 0.5,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
        },
        {
          name: '数字化程度最低值',
          type: 'line',
          data: minData,
          opacity: 0.5,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
        }
      ]
    };
    myChart.setOption(option);
    myChart.resize();
  }, [selectedEnterprise, allScore, maxScore, minScore, selectedIndustry, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "44.1vh" }}>
    </div>
  )
}