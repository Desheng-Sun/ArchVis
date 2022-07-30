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
      title: {
        text: '一级指标概览',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '一级指标',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '35%'],
          label: {
            show: true,
            position: 'inner',
            fontStyle: 'normal',
            fontFamily: 'sans-serif',
            color: '#fff',
            fontSize: 10
          },
          labelLayout: {
            hideOverlap: false
          },
          data: [
            { value: 1548, name: '基本指标', selected: true },
            { value: 775, name: '数字化研发创新指标' },
            { value: 679, name: '组织指标' },
            { value: 775, name: '战略指标' },
            { value: 679, name: '行业特色指标（设计）' },
            { value: 679, name: '行业特色指标（施工）' }
          ]
        },
        {
          name: '二级指标',
          type: 'pie',
          radius: ['45%', '60%'],
          labelLine: {
            length: 30
          },
          data: [
            { value: 448, name: '规模状况' },
            { value: 335, name: '财务状况' },
            { value: 310, name: '研发状况' },
            { value: 251, name: '数字化创新成果状况' },
            { value: 234, name: '数字化技术应用状况' },
            { value: 147, name: '组织结构' },
            { value: 135, name: '承包联合体模式' },
            { value: 102, name: '企业战略规划' },
            { value: 310, name: '企业战略部门' },
            { value: 251, name: '战略影响因素' },
            { value: 234, name: '设计合作' },
            { value: 147, name: '设计项目' },
            { value: 135, name: '设计工具' },
            { value: 102, name: '装配式建筑' },
            { value: 234, name: '智慧工地' },
            { value: 147, name: 'BIM应用' },
            { value: 135, name: '施工管理数字化' },
            { value: 102, name: '施工设施应用' }
          ]
        }
      ]
    };
    myChart.setOption(option);
    myChart.resize();
  }, [data, w, h]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
    </div>
  )
}