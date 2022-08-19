import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import geoChina from "./geo.json";
import { firstArchMap } from '../../../apis/api';

export default function FirstArchMap({ w, h, selectedRegionFirst, setSelectedYearFirst }) {
  const [data, setData] = useState([]);
  const [date, setDate] = useState([2019,2020,2021]);
  const chartRef = useRef(null);
  useEffect(() => {
    firstArchMap().then((res) => {
      setData(res);
    });
  }, [])
  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    let fontsizeNow = parseInt(14 * h / 698)
    fontsizeNow = Math.max(10, fontsizeNow)

    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
      echarts.registerMap('china', { geoJSON: geoChina });
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
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        top: 'bottom',
        min: 0,
        max: 10,
        inRange: {
          color: [
            '#ffffbf',
            '#e0f3f8',
            '#abd9e9',
            '#74add1',
            '#4575b4',
            '#313695'
          ]
        },
        text: ['High', 'Low'],
        calculable: true
      },
      geo: {
        type: 'map',
        map: 'china',
        roam: true,
        center: [101.97, 34.71],
        geoIndex: 1,
        zoom: 1.4,  //地图的比例
        emphasis: {
          itemStyle: {
            areaColor: '#5b8ff9',
          },
          label: {
            color: '#fff',  //选中后的字体颜色
            fontSize: fontsizeNow + 2 + "px"
          }
        },
        label:
        {
          show: true,
          color: '#333',  //字体颜色
          fontSize: fontsizeNow + "px"

        },
        itemStyle: {
          areaColor: '#87b3ff',
          borderColor: 'white',
          // borderWidth: 2,
          // shadowColor: 'rgba(63,218,255,0.3)',
          // shadowBlur: 20,
          show: true
        },
      },
      timeline: {
        data: date,
        axisType: "category",
        autoPlay: false,
        realtime: false,
        left: "15%",
        right: "5%",
        bottom: "0%",
        width: "80%",
        symbolSize: 10,
        //  height: null,
        label: {
          normal: {
            show: true,
            color: "rgb(92, 151, 191)",
          },
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
    };
    myChart.setOption(option, true);
    myChart.on('click', function (param) {
      console.log(param)
      if (param.componentType === "geo") {
        selectedRegionFirst([param.name])
      }
    })
    myChart.dispatchAction({
      type: "timelineChange",
      // 时间点的 index
      currentIndex: 0,
    });
    myChart.on("timelinechanged", (timelineIndex) => {
      setSelectedYearFirst(date[timelineIndex.currentIndex])
    });
    if (myChart._$handlers.click) {
      myChart._$handlers.click.length = 1;
      myChart._$handlers.timelinechanged.length = 1;
    }
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "51vh" }}>
    </div>
  )
}