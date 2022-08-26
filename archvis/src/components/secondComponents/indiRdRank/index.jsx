import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { secondProperty } from '../../../apis/api';

export default function FirstIndicators({w, h, selectedIndustry, nowEnterprise, selectedIndicatorsNd, selectedIndicatorsRd}) {
  const [data, setData] = useState([]);
  const [industry, setIndustry] = useState('constru');
  const [enterpriseList, setEnterpriseList] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    if (selectedIndustry === '施工行业') {
      setIndustry('constru');
    }
    else if (selectedIndustry === '设计行业') {
      setIndustry('design');
    }
  }, [selectedIndustry])
  // useEffect(() => {
  //   console.log('nowEnterprise');
  //   console.log(nowEnterprise);
  //   let 
  //   
    
  // }, [nowEnterprise])
  useEffect(() => {
    var tmp = [];
    if (selectedIndicatorsRd === null) {}
    else {
      secondProperty(industry, selectedIndicatorsRd).then((res) => {
        console.log('res');
        console.log(res);
        for (let i in nowEnterprise) {
          tmp[i] = {
                name: nowEnterprise[i],
                type: 'line',
                data: [null, null, null]
              };
        }
        for (let i in res) {
          for (let j = 0; j < tmp.length; j++) {
            if ((tmp[j].name == res[i]['企业名称']) && (res[i]['年份'] == 2019)) {
              tmp[j].data[0] = res[i][selectedIndicatorsRd];
            }
            else if ((tmp[j].name == res[i]['企业名称']) && (res[i]['年份'] == 2020)) {
              tmp[j].data[1] = res[i][selectedIndicatorsRd];
            }
            else if ((tmp[j].name == res[i]['企业名称']) && (res[i]['年份'] == 2021)) {
              tmp[j].data[2] = res[i][selectedIndicatorsRd];
            }
          }
        }
        setData(tmp);
      })
    }
  }, [industry, nowEnterprise, selectedIndicatorsNd, selectedIndicatorsRd])
  // 随系统缩放修改画布大小
  useEffect(() => {
    console.log('data');
    console.log(data);
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
            data: data.name
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
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
          series: data
    };
    myChart.setOption(option);
    console.log('redraw');
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "61vh" }}>
    </div>
  )
}