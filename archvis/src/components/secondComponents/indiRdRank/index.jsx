import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { selectProperty } from '../../../apis/api';

export default function FirstIndicators({w, h, selectedIndustry, nowEnterprise, selectedIndicatorsNd, selectedIndicatorsRd}) {
  const [data, setData] = useState([]);
  const [industry, setIndustry] = useState('constru');
  const chartRef = useRef(null);
  useEffect(() => {
    if (selectedIndustry === '施工行业') {
      setIndustry('constru');
    }
    else if (selectedIndustry === '设计行业') {
      setIndustry('design');
    }
  }, [selectedIndustry])
  useEffect(() => {
    var tmp = {};
    console.log('nowEnterprise');
    console.log(nowEnterprise);
    for (let i in nowEnterprise) {
      tmp[nowEnterprise[i]] = [];
      if (selectedIndicatorsRd === null) {
        // selectProperty(industry, nowEnterprise[i], selectedIndicatorsNd).then((res) => {
        //   tmp[nowEnterprise[i]].push(res);
        // })
      }
      else {
        // 异步
        selectProperty(industry, nowEnterprise[i], selectedIndicatorsRd).then((res) => {
          console.log('res');
          console.log(res);
          for (let j in res) {
            if (res[j]['年份'] == 2019) {
              tmp[nowEnterprise[i]][0] = res[j][selectedIndicatorsRd];
            }
            else if (res[j]['年份'] == 2020) {
              tmp[nowEnterprise[i]][1] = res[j][selectedIndicatorsRd];
            }
            else if (res[j]['年份'] == 2021) {
              tmp[nowEnterprise[i]][2] = res[j][selectedIndicatorsRd];
            }
            console.log('debug1');
          }
          setData(tmp);
        })
      }
    }
  }, [industry, nowEnterprise, selectedIndicatorsNd, selectedIndicatorsRd])
  // 随系统缩放修改画布大小
  useEffect(() => {
    console.log('data');
    console.log(data);
    var series = [];
    var j = 0;
    for (let i in data) {
      series[j] = {
        name: i,
        type: 'line',
        data: data[i]
      }
      j++;
    }
    console.log('series');
    console.log(series);
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
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
            trigger: 'axis'
          },
          legend: {
            top: '5%',
            // data: ['企业1', '企业2', '企业3', '企业4', '企业5']
            data: data
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2019年', '2020年', '2021年']
          },
          yAxis: {
            type: 'value',
            max: (value) => {
                return value.max
              }
          },
          series: series
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "47.2vh" }}>
    </div>
  )
}