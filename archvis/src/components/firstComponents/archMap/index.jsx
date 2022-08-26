import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import geoChina from "./geo.json";
import { firstArchMap } from '../../../apis/api';

export default function FirstArchMap({ w, h, selectedRegionFirst, selectedYearFirst, setSelectedRegionFirst, setSelectedYearFirst }) {
  const [data, setData] = useState([]);
  const [date, setDate] = useState([2019, 2020, 2021]);
  const chartRef = useRef(null);
  let regionCity = {
    "东北": ["辽宁", "吉林", "黑龙江"],
    "华北": ["北京", "天津", "河北", "山西", "内蒙古"],
    "华东": ["上海", "江苏", "浙江", "山东", "安徽"],
    "华中": ["湖北", "湖南", "河南", "江西"],
    "华南": ["广东", "广西", "海南", "福建"],
    "西南": ["四川", "重庆", "贵州", "云南", "西藏"],
    "西北": ["陕西", "甘肃", "宁夏", "青海", "新疆"],
    "港澳台": ["香港", "澳门", "台湾"]
  }
  useEffect(() => {
    firstArchMap(selectedYearFirst).then((res) => {
      let useData = []
      let nowCityPosition = {}
      for (let i of geoChina.features) {
        nowCityPosition[i.properties.name.slice(0, 2)] = i.properties.center
      }
      for (let i of res) {
        useData.push({
          name: i["省份"],
          value: [nowCityPosition[i["省份"].slice(0, 2)][0], nowCityPosition[i["省份"].slice(0, 2)][1], i["COUNT(*)"]]
        })
      }
      setData(useData);
    });
  }, [selectedYearFirst])
  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    let fontsizeNow = parseInt(14 * h / 698)
    let index = date.indexOf(selectedYearFirst)
    fontsizeNow = Math.max(10, fontsizeNow)
    let nowAllCity = []
    for (let i of selectedRegionFirst) {
      nowAllCity = nowAllCity.concat(regionCity[i])
    }
    let useCityData = []
    for (let i in regionCity) {
      for (let j of regionCity[i]) {
        if (nowAllCity.includes(j)) {
          useCityData.push({
            name: j,
            value: 100
          })
        }
        else {
          useCityData.push({
            name: j,
            value: 0
          })
        }
      }
    }
    console.log(useCityData)

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
        max: 20,
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
      geo: {
        type: 'map',
        map: 'china',
        roam: true,
        center: [101.97, 34.71],
        geoIndex: 0,
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
      series: [
        {
          type: 'map',
          map: 'china',
          roam: true,
          geoIndex: 0,
          data: useCityData,
          label: {
            // 默认文本标签样式
            normal: {
              color: "white",
              show: true,
            },
            // 高亮文本标签样式
            emphasis: {
              color: "yellow",
              fontSize: 22,
              fontWeight: "bold",
            },
          },
          itemStyle: {
            // 默认区域样式
            normal: {
              // 区域背景透明
              areaColor: "transparent",
              borderColor: "rgba(39,211,233, 1)",
              borderWidth: 1,
            },
            // 高亮区域样式
            emphasis: {
              // 高亮区域背景色
              areaColor: "#01ADF2",
            },
          },
          
          animation: true,
        },
        {
          name: "各地区建筑公司数量",
          type: "scatter",
          coordinateSystem: 'geo',
          data: data,
          geoIndex: 0,
          symbolSize: 25,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true, // 是否显示鼠标悬浮动画
          label: {
            show: true, // 显示地区名称
            symbolSize: 25,
            formatter: function (val) {
              return val.value[2]
            },
          },

          // 鼠标悬浮上去的样式
          emphasis: {
            label: {
              show: true, // 显示地区名称
              symbolSize: 40,

              formatter: function (val) {
                return val.value[2]
              },
            }
          },
          tooltip: {
            formatter: function (val) {
              return val.data.name + ":  " + val.data.value[2]
            }
          },
          zlevel: 3
        }
      ]
    };
    myChart.setOption(option, true);
    myChart.on('click', function (param) {
      console.log(param)
      if (param.componentSubType === "map" || param.componentSubType === "scatter") {
        for (let i of useCityData) {
          if (param.name.includes(i["name"])) {
            setSelectedRegionFirst([i["name"]])
            break
          }
        }
      }
    })
    myChart.dispatchAction({
      type: "timelineChange",
      // 时间点的 index
      currentIndex: index,
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