import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { firstArchIndustry } from '../../../apis/api';
export default function ThirdEPScoreIndiND({ w, h, selectedEnterprise, selectedIndustry, construScore, designScore, allDate }) {
  const [data, setData] = useState();
  const [indicators, setIndicators] = useState([]);
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
      let useData = {}
      for (let i of res) {
        useData[i.id] = i
        useData[i.id]["score"] = {}
        for (let j of allDate) {
          useData[i.id]["score"][j] = 0
        }
      }
      setIndicators(useData)
    })
  }, [selectedIndustry, allDate,])

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
    if (nowIndusrtyData) {
      for (let i in indicators) {
        let nowIndicators = indicators[i]
        if (nowIndicators["level"] === 3) {
          let nowIndusrtyName = nowIndicators["indi_name"].trim()
          for (let j of allDate) {
            indicators[i]["score"][j] = nowIndusrtyData[j][0][nowIndusrtyName] * nowIndusrtyData[j][1][nowIndusrtyName] * 100
            indicators[nowIndicators["parent_id"]]["score"][j] += indicators[i]["score"][j]
            let firtParentId = indicators[nowIndicators["parent_id"]]["parent_id"]
            indicators[firtParentId]["score"][j] += indicators[nowIndicators["parent_id"]]["score"][j]
          }
        }
      }
      setData(indicators)
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
    for (let i in data) {
      if (data[i]["level"] === 2) {
        legendData.push({
          name: data[i]["indi_name"]
        })
        let nowData = []
        for (let j of allDate) {
          nowData.push(data[i]["score"][j])
        }
        seriseData.push({
          name: data[i]["indi_name"],
          type: 'bar',
          stack: data[i]["parent_id"],
          emphasis: {
            focus: 'series'
          },
          data: nowData
        })
      }
    }

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
            type: 'shadow'
        },  
        position: function (point) {
          // 固定在顶部
          return [point[0], '10%'];
      }
      },
      legend: legendData,
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
          data: allDate

        }
      ],
      series: seriseData
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);
  return (
    <div ref={chartRef} style={{ width: "100%", height: "44.1vh" }}>
    </div>
  )
}