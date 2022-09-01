import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { thirdEPPos } from '../../../apis/api';
export default function ThirdEPPosplashes({w, h, selectedIndustry, setNowEnterpriseThird}) {
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
    var tmp=[];
    tmp[0]=[];
    tmp[1]=[];
    tmp[2]=[];
    thirdEPPos(industry).then((res) => {
      console.log("res");

      console.log(res);
      for (let i of res){
        if (i["年份"] ==2019){
          tmp[0].push(i);
        }
        else if (i["年份"] ==2020){
          tmp[1].push(i);
        }
        else if (i["年份"] ==2021){
          tmp[2].push(i);
        }
      }
      setData(tmp); 
      console.log("12345324567");    
 
      console.log(tmp);    
    })
  }, [industry])

  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }

    // 数据根据年份分成三组
    let data19=[];
    let data20=[];
    let data21=[];
    for (let i in data[0]){
      data19[i]=[];
      data19[i].push(data[0][i].总资产)
      data19[i].push(data[0][i].资产负债率)
      data19[i].push(data[0][i].企业名称)
    }
    for (let i in data[1]){
      data20[i]=[];
      data20[i].push(data[1][i].总资产)
      data20[i].push(data[1][i].资产负债率)
      data20[i].push(data[1][i].企业名称)

    }
    for (let i in data[2]){
      data21[i]=[];
      data21[i].push(data[2][i].总资产)
      data21[i].push(data[2][i].资产负债率)
      data21[i].push(data[2][i].企业名称)

    }  
    const schema = [
      { name: 'date', index: 0, text: '数字化程度' },
      { name: 'AQIindex', index: 1, text: '规模' }
    ];
    const itemStyle = {
      opacity: 0.8,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.3)'
    };
    const option = {
      color: [
        "#5b8ff9",
        "#5ad8a6",
        // "#5d7092",
        "#f6bd16",
        "#e86452",
        "#6dc8ec",
        "#945fb9",
        "#ff9845",
        "#1e9493",
        "#ff99c3"
      ],
      legend: {
        top: 10,
        data: ['2019年', '2020年', '2021年'],
        textStyle: {
          fontSize: 16
        }
      },
  grid: {
    left: '10%',
    right: 150,
    top: '18%',
    bottom: '10%'
  },
  tooltip: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    formatter: function (param) {
      var value = param.value;
      // prettier-ignore
      return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                // param.seriesName
                + param.seriesName+ "：" + value[2]
                + '</div>'
                + schema[0].text + '：' + value[0] + '<br>'
                + schema[1].text + '：' + value[1] + '<br>';
    }
  },
  xAxis: {
    type: 'value',
    name: '企业规模（总资产）',
    min: 'dataMin',
    max: 'dataMax',
    nameGap: 16,
    nameTextStyle: {
      fontSize: 16,
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    splitLine: {
      show: true,
      min: 'dataMin',
      max: 'dataMax',
      lineStyle: {
        type: 'dashed'
    }
    }
  },
  yAxis: {
    type: 'value',
    name: '数字化程度\n（最终得分）',
    nameLocation: 'end',
    nameGap: 20,
    nameTextStyle: {
      fontSize: 16
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
    }
    }
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 2
    },
    {
      type: 'slider',
      show: true,
      yAxisIndex: [0],
      left: '93%',
      start: 0.2,
      end: 0.9
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 0,
      end: 2
    },
    {
      type: 'inside',
      yAxisIndex: [0],
      start: 0.2,
      end: 0.9
    }
  ],
  series: [
    {
      name: "2019年",
      type: 'scatter',
      itemStyle: itemStyle,
      data: data19,
      label: {
        show: true,
        position: 'top',
        color: '#000',
        formatter: function (param) {
          var value = param.value;
          return value[2]
        }
      }
    },
    {
      name: "2020年",
      type: 'scatter',
      itemStyle: itemStyle,
      data: data20,
      label: {
        show: true,
        position: 'top',
        color: '#000',
        formatter: function (param) {
          var value = param.value;
          return value[2]
        }
      }
    },
    {
      name: "2021年",
      type: 'scatter',
      itemStyle: itemStyle,
      data: data21,
      label: {
        show: true,
        position: 'top',
        color: '#000',
        formatter: function (param) {
          var value = param.value;
          return value[2]
        }
      }
    }
    // {
    //   name: '二类企业',
    //   type: 'scatter',
    //   itemStyle: itemStyle,
    //   data: data2,
    //   label: {
    //     show: true,
    //     position: 'top',
    //     color: '#000',
    //     formatter: function (param) {
    //       var value = param.value;
    //       return value[2]
    //     }
    //   }
    // },
    // {
    //   name: '三类企业',
    //   type: 'scatter',
    //   itemStyle: itemStyle,
    //   data: data3,
    //   label: {
    //     show: true,
    //     position: 'top',
    //     color: '#000',
    //     formatter: function (param) {
    //       var value = param.value;
    //       return value[2]
    //     }
    //   }
    // },
    // {
    //   name: '四类企业',
    //   type: 'scatter',
    //   itemStyle: itemStyle,
    //   data: dataSH
    // },
    // {
    //   name: '五类企业',
    //   type: 'scatter',
    //   itemStyle: itemStyle,
    //   data: dataGZ
    // }
  ]
    };
    myChart.setOption(option);

    // 鼠标点击获取企业名称
    myChart.on('click', function (param) {
      if (param.componentType === "series") {
        console.log("param");
        console.log(param.data[2]);
        setNowEnterpriseThird(param.data[2]);       
      }
    })

    myChart.resize();
  }, [data, w, h, selectedIndustry]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "61vh" }}>
    </div>
  )
}