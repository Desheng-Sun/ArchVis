// import "./index.css";
import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { firstArchRank } from '../../../apis/api';
export default function FirstArchRank({ w, h, selectedRegionFirst, selectedYearFirst, selectdIndustryFirst, selectedCompanyFirst, construScore, designScore, setSelectedYearFirst, allDate }) {
  const [construData, setConstruData] = useState([]);
  const [designData, setDesignData] = useState([]);
  const [allScore, setAllScore] = useState()
  const chartRef = useRef(null);
  const [selectDateIndex, setSelectDateIndex] = useState(0)
  useEffect(() => {
    firstArchRank(selectedRegionFirst, selectedYearFirst, 'constru').then((res) => {
      let useData = []
      for (let i of res) {
        useData.push(i["企业名称"])
      }
      setConstruData(useData)
    })
    firstArchRank(selectedRegionFirst, selectedYearFirst, 'design').then((res) => {
      let useData = []
      for (let i of res) {
        useData.push(i["企业名称"])
      }
      setDesignData(useData)
    })

  }, [selectedRegionFirst, selectedYearFirst])

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
            nowFinalData[nowEnterpriseName] = nowFinalData[nowEnterpriseName].toFixed(3)
          }

        }
        finalData[i] = nowFinalData
      }
      setAllScore(finalData)
    }

  }, [construScore, designScore])

  useEffect(() => {
    if (allDate.length > 0) {
      setSelectedYearFirst(allDate[selectDateIndex])
    }
  }, [selectDateIndex])

  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }

    let index = allDate.indexOf(selectedYearFirst)
    //存储数据的数组
    let useData = []
    if (allScore) {
      // 获取当前需要展示的数据
      if (selectdIndustryFirst.length === 2) {
        for (let i of construData) {
          useData.push([i, allScore[selectedYearFirst][i], 1])
        }
        for (let i of designData) {
          useData.push([i, allScore[selectedYearFirst][i], 2])
        }
      }
      else if (selectdIndustryFirst[0] === "施工行业") {
        for (let i of construData) {
          useData.push([i, allScore[selectedYearFirst][i], 1])
        }
      }
      else if (selectdIndustryFirst[0] === "设计行业") {
        for (let i of designData) {
          useData.push([i, allScore[selectedYearFirst][i], 2])
        }
      }
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid:{
        bottom:"30%"
      },
      xAxis: {
        type: 'category',
        name: '企业简称',
        axisLabel: {
          interval: 0,
          fontSize: "10px",
          formatter: function (param) {
            return param.split('').join('\n')
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '企业数字化综合得分'
      },
      timeline: {
        data: allDate,
        axisType: "category",
        autoPlay: false,
        realtime: false,
        left: "5%",
        right: "5%",
        bottom: "0%",
        symbolSize: 10,
        //  height: null,
        label: {
          show: true,
          color: "rgb(92, 151, 191)",
        },
        lineStyle: {
          show: true,
          color: "rgb(92, 151, 191)",
        },
        itemStyle: {
          show: true,
          color: "rgb(92, 151, 191)",
        },
        controlStyle: {
          show: true,
          showPlayBtn: false,
          color: "rgb(92, 151, 191)",
          borderColor: "rgb(92, 151, 191)",
        },
        checkpointStyle: {
          symbolSize: 13,
          color: "rgb(115, 192, 222)",
          borderWidth: 2,
          borderColor: "rgb(255, 255, 138)",
        },
      },
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: 0,
          start: 0,
          end: 100,
        }
      ],
      series: {
        name: '得分',
        data: useData,
        type: 'bar',
        encode: { x: 'name', y: 'score' },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        itemStyle: {
          color: function (param) {
            if (param.value[0] === selectedCompanyFirst) {
              return '#edbb8a'
            }
            else if (param.value[2] === 1) {
              return '#008080'
            }
            else if (param.value[2] === 2) {
              return '#de8a5a'
            }
          }
        }
      }
    };
    myChart.setOption(option);
    myChart.resize();
    myChart.dispatchAction({
      type: "timelineChange",
      // 时间点的 index
      currentIndex: index,
    });
    myChart.on("timelinechanged", (timelineIndex) => {
      setSelectDateIndex(timelineIndex.currentIndex)
    });
    if (myChart._$handlers.timelinechanged) {
      myChart._$handlers.timelinechanged.length = 1;
    }
  }, [construData, designData, allScore, selectdIndustryFirst, selectedCompanyFirst, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "37.2vh" }}>
    </div>
  )
}