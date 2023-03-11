import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { firstArchIndustry } from '../../../apis/api';

export default function FirstIndicators({ w, h, selectedIndustrySecond, setSelectedIndicatorsNd, setSelectedIndicatorsRd }) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    let industry = ""
    if (selectedIndustrySecond === '施工行业') {
      industry = 'constru';
    }
    else if (selectedIndustrySecond === '设计行业') {
      industry = 'design';
    }
    firstArchIndustry(industry).then((res) => {
      setData(res)
    })
  }, [selectedIndustrySecond])
  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    var drawdata = [];
    var dataChildren = [];
    for (let i in data) {
      if (data[i].level === 2) {
        dataChildren.push({
          name: data[i].indi_name,
          children: [],
          explain: data[i].explanation
        })
      }
      else if (data[i].level === 3) {
        dataChildren[data[i].parent_id - 6].children.push({
          name: data[i].indi_name,
          explain: data[i].explanation,
          parent: dataChildren[data[i].parent_id - 6].name,
          value: 1
        })
      }
    }
    var j = 0;
    for (let i in data) {
      if (data[i].level === 1) {
        drawdata.push({
          name: data[i].indi_name,
          children: [],
          explain: data[i].explanation
        })
      }
      else if (data[i].level === 2) {
        drawdata[data[i].parent_id - 1].children.push(dataChildren[j]);
        j++;
      }
      else {
        break;
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
      tooltip: {
        trigger: 'item',
        confine: true,
        formatter: function (params) {
          if (params.data.explain != null) {
            return '<span style="font-weight: bold;">' + params.data.name + '</span><br>' + params.data.explain;
          }
          else {
            return params.data.name;
          }
        },
      },
      series: [
        {
          type: 'sunburst',
          id: 'echarts-package-size',
          radius: ['10%', '90%'],
          animationDurationUpdate: 1000,
          data: drawdata,
          universalTransition: true,
          nodeClick: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.5)'
          },
          label: {
            show: true
          },
          levels: [
            {},
            {
              r0: '10%',
              r: '40%',
              label: {
                rotate: 0,
                width: 60,
                overflow: 'break'
              }
            },
            {
              r0: '40%',
              r: '75%',
              label: {
                width: '50',
                overflow: 'break'
              }
            },
            {
              r0: '75%',
              r: '90%',
              label: {
                show: false
                // position: 'outside',
                // width: '70',
                // color: 'inherit',
                // overflow: 'break'
              }
            }
          ]
        }
      ]
    };
    myChart.setOption(option);
    myChart.on('click', function (params) {
      if (params.data.value == 1) {
        setSelectedIndicatorsNd(params.data.parent)
        setSelectedIndicatorsRd(params.data.name)
      }
      else {
        setSelectedIndicatorsNd(params.data.name)
      }
    });
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "61vh" }}>
    </div>
  )
}