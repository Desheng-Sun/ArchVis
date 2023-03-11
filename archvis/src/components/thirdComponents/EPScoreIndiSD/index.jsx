import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { firstArchIndustry } from '../../../apis/api';

export default function ThirdEPScoreIndiSD({ w, h, selectedEnterprise, selectedIndustry, construScore, designScore, allDate }) {
  const [data, setData] = useState();
  const [indicators, setIndicators] = useState();
  const [nowIndusrtyData, setNowIndusrtyData] = useState()
  const chartRef = useRef(null);

  useEffect(() => {
    let industry = ''
    if (selectedIndustry === '施工行业') {
      industry = 'constru';
    }
    else if (selectedIndustry === '设计行业') {
      industry = 'design';
    }
    firstArchIndustry(industry).then((res) => {
      // 所有的指标名
      setIndicators(res)
    })
  }, [selectedIndustry, allDate])

  useEffect(() => {
    if (construScore && designScore) {
      let useData = {}
      for (let i in construScore) {
        let nowUseScore = {}
        let nowUseDScore = {}
        if (selectedIndustry === '施工行业') {
          nowUseScore = construScore[i][0];
          nowUseDScore = construScore[i][1]
        }
        else if (selectedIndustry === '设计行业') {
          nowUseScore = designScore[i][0];
          nowUseDScore = designScore[i][1]
        }
        useData[i] = []
        let useDataYear = {}
        for (let j in nowUseScore["企业名称"]) {
          if (nowUseScore["企业名称"][j] == selectedEnterprise) {
            for (let k in nowUseScore) {
              useDataYear[k] = nowUseScore[k][j]
            }
          }
        }
        useData[i] = [useDataYear, nowUseDScore]
      }
      setNowIndusrtyData(useData)
    }
  }, [construScore, designScore, selectedEnterprise])

  useEffect(() => {
    if (nowIndusrtyData && indicators) {
      let useData = {}
      for (let i of indicators) {
        useData[i.id] = i
        useData[i.id]["score"] = {}
        for (let j of allDate) {
          useData[i.id]["score"][j] = 0
        }
      }
      for (let i in useData) {
        let nowIndicators = useData[i]
        if (nowIndicators["level"] === 3) {
          let nowIndusrtyName = nowIndicators["indi_name"].trim()
          for (let j of allDate) {
            useData[i]["score"][j] = nowIndusrtyData[j][0][nowIndusrtyName] * nowIndusrtyData[j][1][nowIndusrtyName] * 100
            useData[nowIndicators["parent_id"]]["score"][j] += useData[i]["score"][j]
            let firtParentId = useData[nowIndicators["parent_id"]]["parent_id"]
            useData[firtParentId]["score"][j] += useData[nowIndicators["parent_id"]]["score"][j]
          }
        }
      }
      setData(useData)
    }
  }, [nowIndusrtyData, indicators])

  useEffect(() => {
    if (!data) {
      return
    }
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    let legendData = []
    let seriseData = []
    let indicatorData = []
    for (let i of allDate) {
      legendData.push({
        name: i.toString(),
        icon: "circle"
      })
      seriseData.push({
        value: [],
        name: i,


      })
    }
    for (let i in data) {
      if (data[i]["level"] === 1) {
        indicatorData.push({
          name: data[i]["indi_name"]
        })
        for (let j of seriseData) {
          j["value"].push(data[i]["score"][j["name"]])
        }
      }
    }

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
      legend: {
        bottom: 5,
        data: legendData,
        itemGap: 20,
        textStyle: {
          color: '#aaa',
          fontSize: 14
        }
      },
      radar: {
        indicator: indicatorData,
        axisLabel: {
          show: true
        },
        hideOverlap: true,
      },
      series: [
        {
          name: 'score',
          type: 'radar',
          data: seriseData
        },
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