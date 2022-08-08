import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import geoChina from "./geo.json";

export default function FirstArchMap({w, h}) {
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
        title: {
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
                '#313695',
                '#4575b4',
                '#74add1',
                '#abd9e9',
                '#e0f3f8',
                '#ffffbf',
                '#fee090',
                '#fdae61',
                '#f46d43',
                '#d73027',
                '#a50026'
              ]
            },
            text: ['High', 'Low'],
            calculable: true
          },
          geo: {
            type: 'map',
            map: 'china',
            roam: true,
            geoIndex: 1,
            zoom: 1.2,  //地图的比例
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#1890ff',  //字体颜色
                  fontSize:"2vw"
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff',  //选中后的字体颜色
                  fontSize:"10px"
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#e0f3f8',
                borderColor: '#abd9e9',
                borderWidth: 2,
			          shadowColor: 'rgba(63,218,255,0.3)',
			          shadowBlur: 20,
			          show: true
              },
              emphasis: {
                areaColor: '#1890ff',
              }
            },
        }
    };
    myChart.setOption(option, true);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "51vh"}}>
    </div>
  )
}