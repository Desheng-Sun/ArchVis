import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import geoChina from "./geo.json";

export default function FirstArchMap(w, h) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {

  }, [data])
  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
      echarts.registerMap('china', {geoJSON: geoChina});
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
            text: '全国范围建筑企业数字化概览',
            textStyle: {
              color:'#fff'
            },
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            top: 'bottom',
            min: 500000,
            max: 38000000,
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
            zoom: 1.8,  //地图的比例
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#333'  //字体颜色
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'  //选中后的字体颜色
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#87b3ff',
                borderColor: 'white',
                borderWidth: 2,
			          shadowColor: 'rgba(63,218,255,0.3)',
			          shadowBlur: 20,
			          show: true
              },
              emphasis: {
                areaColor: '#5b8ff9',
              }
            }
        }
    };
    myChart.setOption(option, true);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
    </div>
  )
}