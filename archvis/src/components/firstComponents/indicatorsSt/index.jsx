// import "./index.css";

import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";

export default function FirstIndicators(w, h) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {

  }, [data])
  // 随系统缩放修改画布大小
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(chartRef.current)
    if (myChart == null) {
      myChart = echarts.init(chartRef.current);
    }
    const option = {
      legend: {
        data: [
          "3-11岁任务数",
          "3-11岁全程接种量",
          "60岁任务数",
          "60岁全程接种量",
          "80岁任务数",
          "80岁全程接种量",
          "完成率",
        ],
      },
      xAxis: {
        type: "category",
        data: ["街道1", "街道2", "街道3", "街道4", "街道5", "街道6", "街道7"],
      },
      yAxis: [
        { type: "value" },
        {
          type: "value",
          name: "%",
          nameTextStyle: {
            color: "#ccc",
            padding: [0, 0, 10, -30],
          },
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              width: 1,
              color: ["#ccc", "#ccc"],
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          color: "#fff",
          align: "left",
          fontSize: 14,
        },
        backgroundColor: "rgba(0,0,0,0.8)",
      },
      series: [
        {
          name: "3-11岁任务数",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "bar",
        },
        {
          name: "3-11岁全程接种量",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "bar",
        },
        {
          name: "60岁任务数",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "bar",
        },
        {
          name: "60岁全程接种量",
          data: [880, 30, 124, 118, 35, 47, 160],
          type: "bar",
        },
        {
          name: "80岁任务数",
          data: [660, 30, 124, 118, 35, 47, 160],
          type: "bar",
        },
        {
          name: "80岁全程接种量",
          data: [880, 30, 124, 118, 35, 47, 160],
          type: "bar",
        },
        {
          name: "完成率",
          data: [50, 130, 124, 18, 35, 47, 160],
          yAxisIndex: 1,
          type: "line",
          smooth: true,
        },
      ],
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
    </div>
  )
}