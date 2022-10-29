import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import geoChina from "./geo.json";
import { firstArchMap } from '../../../apis/api';

export default function FirstArchMap({ w, h, selectedRegionFirst, selectedYearFirst, selectdIndustryFirst, setSelectedRegionFirst,  }) {
  const [construData, setConstruData] = useState({});
  const [designData, setDesignData] = useState({});
  const chartRef = useRef(null);

  // 各个地区包含的省份信息
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
    // 获取所有建筑行业的地区信息
    firstArchMap(selectedYearFirst, "constru").then((res) => {
      let useData = {}
      let nowCityPosition = {}
      for (let i of geoChina.features) {
        nowCityPosition[i.properties.name.slice(0, 2)] = i.properties.center
      }
      for (let i of res) {
        if (!useData.hasOwnProperty(i["省份"])) {
          useData[i["省份"]] = {
            name: i["省份"],
            position: [nowCityPosition[i["省份"].slice(0, 2)][0], nowCityPosition[i["省份"].slice(0, 2)][1]],
            archNum: 0,
            archList: []
          }
        }
        useData[i["省份"]]["archNum"] += 1
        useData[i["省份"]]["archList"].push(i["企业名称"])
      }
      setConstruData(useData);
    });
    // 获取所有设计行业的地区信息
    firstArchMap(selectedYearFirst, "design").then((res) => {
      let useData = []
      let nowCityPosition = {}
      for (let i of geoChina.features) {
        nowCityPosition[i.properties.name.slice(0, 2)] = i.properties.center
      }
      for (let i of res) {
        if (!useData.hasOwnProperty(i["省份"])) {
          useData[i["省份"]] = {
            name: i["省份"],
            position: [nowCityPosition[i["省份"].slice(0, 2)][0], nowCityPosition[i["省份"].slice(0, 2)][1]],
            archNum: 0,
            archList: []
          }
        }
        useData[i["省份"]]["archNum"] += 1
        useData[i["省份"]]["archList"].push(i["企业名称"])
      }
      setDesignData(useData);
    });
  }, [selectedYearFirst])


  // 随系统缩放修改画布大小
  useEffect(() => {
    // 设置地图字体的大小
    let fontsizeNow = parseInt(14 * h / 698)
    fontsizeNow = Math.max(10, fontsizeNow)
    let nowAllCity = []
    // 获取当前选择的所有地区包含的省份
    for (let i of selectedRegionFirst) {
      nowAllCity = nowAllCity.concat(regionCity[i])
    }
    if (nowAllCity[0] == undefined) {
      nowAllCity = selectedRegionFirst
    }
    // 获取所有省份的全程
    let nowCityName = {}
    for (let i of geoChina.features) {
      nowCityName[i.properties.name.slice(0, 2)] = i.properties.name
    }
    let useCityData = []
    // 创建地图热力图
    if (nowAllCity.length > 0) {
      for (let i in regionCity) {
        for (let j of regionCity[i]) {
          if (nowAllCity.includes(j)) {
            useCityData.push({
              name: nowCityName[j.slice(0, 2)],
              value: 1
            })
          }
          else {
            useCityData.push({
              name: nowCityName[j.slice(0, 2)],
              value: 0
            })
          }
        }
      }
    }

    // 获取各个地区的公司数量
    let useCityIndustryNumDict = {}
    // 全部公司
    if (selectdIndustryFirst.length == 2) {
      for (let i in construData) {
        useCityIndustryNumDict[i] = {
          name: construData[i].name,
          value: [construData[i].position[0], construData[i].position[1], construData[i].archNum],
          archList: construData[i].archList
        }
      }
      for (let i in designData) {
        if (useCityIndustryNumDict.hasOwnProperty(i)) {
          useCityIndustryNumDict[i].value[2] += designData[i].archNum
          useCityIndustryNumDict[i].archList = useCityIndustryNumDict[i].archList.concat(designData[i].archList)
        }
        else {
          useCityIndustryNumDict[i] = {
            name: designData[i].name,
            value: [designData[i].position[0], designData[i].position[1], designData[i].archNum],
            archList: designData[i].archList
          }
        }
      }
    }
    // 施工行业公司
    else if (selectdIndustryFirst[0] === "施工行业") {
      for (let i in construData) {
        useCityIndustryNumDict[i] = {
          name: construData[i].name,
          value: [construData[i].position[0], construData[i].position[1], construData[i].archNum],
          archList: construData[i].archList
        }
      }
    }
    // 设计行业公司
    else if (selectdIndustryFirst[0] === "设计行业") {
      for (let i in designData) {
        useCityIndustryNumDict[i] = {
          name: designData[i].name,
          value: [designData[i].position[0], designData[i].position[1], designData[i].archNum],
          archList: designData[i].archList
        }
      }
    }
    let useCityIndustryNum = []
    for (let i in useCityIndustryNumDict) {
      useCityIndustryNum.push(useCityIndustryNumDict[i])
    }

    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
      echarts.registerMap('china', { geoJSON: geoChina });
    }
    const option = {
      // color: [
      //   "#008080",
      //   "#5ad8a6",
      //   "#b4c8a8",
      //   "#f6edbd",
      //   "#edbb8a",
      //   "#de8a5a",
      //   "#ca562c",
      //   "#39b185",
      //   "#bd925a",
      //   "#42b7b9"
      // ],
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: [{
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
        calculable: true,
        seriesIndex: 1
      },
      {
        min: 0,
        max: 1,
        inRange: {
          color: [
            '#74add1',
            '#00a0a0'
          ]
        },
        calculable: true,
        show: false,
        seriesIndex: 0
      },
      ],

      geo: {
        type: 'map',
        map: 'china',
        roam: true,
        center: [101.97, 34.71],
        geoIndex: 0,
        zoom: 1.4,  //地图的比例
        emphasis: {
          itemStyle: {
            areaColor: '#008080',
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
          areaColor: '#00a0a0',
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
            color: "white",
            show: true,
          },
          itemStyle: {
            // 区域背景透明
            areaColor: "transparent",
            borderColor: "rgba(39,211,233, 1)",
            borderWidth: 1,

          },
          // 高亮区域样式
          emphasis: {
            itemStyle: {
              // 高亮区域背景色
              areaColor: "#01ADF2",
            },
            label: {
              color: "yellow",
              fontSize: 22,
              fontWeight: "bold",
            }
          },
          tooltip: {
            formatter: function (val) {
              let str = []
              for(let i in useCityIndustryNumDict){
                if(i.slice(0, 2) === val.data.name.slice(0, 2)){
                  str.push(i + '企业名单：<hr size=1 style="margin: 3px 0">')
                  for (let j of useCityIndustryNumDict[i]["archList"]) {
                    str.push(j + '<br/>')
                  }
                  break
                }
              }
              str = str.join('')
              return str
            },
            position: function (point) {
              // 固定在顶部
              return [point[0], point[1]];
            }
          }
        },
        {
          name: "各地区建筑公司数量",
          type: "scatter",
          coordinateSystem: 'geo',
          data: useCityIndustryNum,
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
              let str = [val.data.name + '企业名单：<hr size=1 style="margin: 3px 0">']
              for (let i of useCityIndustryNumDict[val.data.name]["archList"]) {
                str.push(i + '<br/>')
              }
              str = str.join('')
              return str
            },
            position: function (point) {
              // 固定在顶部
              return [point[0], point[1]];
            }
          },
          zlevel: 3
        }
      ]
    };

    myChart.setOption(option, true);
    myChart.on('click', function (param) {
      if (param.componentSubType === "map" || param.componentSubType === "scatter") {
        for (let i in regionCity) {
          for (let j of regionCity[i]) {
            if (param.name.includes(j)) {
              setSelectedRegionFirst([j])
              break
            }
          }
        }
      }
    })
    myChart.getZr().on('click', function (param) {
      console.log(1)
      let x = param.offsetX; //当前点相对于echart dom的左上角的像素偏移
      let y = param.offsetY;
      let isIn = myChart.containPixel(
        {
          geoIndex: 0,
        },
        [x, y]
      );
      if (!isIn) {
        setSelectedRegionFirst(["东北", "华北", "华东", "华中", "华南", "西北", "西南", "港澳台"])
      }
    })


    if (myChart._$handlers.click) {
      myChart._$handlers.click.length = 1;
      myChart._zr.handler._$handlers.click = myChart._zr.handler._$handlers.click.slice(myChart._zr.handler._$handlers.click.length - 2, myChart._zr.handler._$handlers.click.lengt)
    }
    myChart.resize();
  }, [selectedRegionFirst, construData, designData, selectdIndustryFirst, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "51vh" }}>
    </div>
  )
}