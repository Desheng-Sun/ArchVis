import { Radio, Space } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import { secondIndicators } from '../../../apis/api';
import "./index.css"


export default function SecondIndicatorsRdSelect({ selectedIndustry, selectedIndicatorsNd, selectedIndicatorsRd, setSelectedIndicatorsRd }) {
  const [industry, setIndustry] = useState('constru');
  const [indicatorsRd, setIndicatorsRd] = useState([]);
  const onChange = (e) => {
    setSelectedIndicatorsRd(e.target.value)
  };
  useEffect(() => {
    if (selectedIndustry === '施工行业') {
      setIndustry('constru');
    }
    else if (selectedIndustry === '设计行业') {
      setIndustry('design');
    }
  }, [selectedIndustry])
  useEffect(() => {
    secondIndicators(industry).then((res) =>{
      var tmp = {};
      for (let i in res) {
        if (res[i].level === 2) {
          tmp[res[i].indi_name] = [];
          for (let j in res) {
            if (res[j].parent_id === res[i].id) {
              tmp[res[i].indi_name].push(res[j].indi_name);
            }
          }
        }
      }
      setIndicatorsRd(tmp[selectedIndicatorsNd])
      console.log(tmp);
    });
  }, [industry, selectedIndicatorsNd])
  return (
    <div id ="secondIndicatorsRdSelect" style={{ paddingTop: "5%" }}>
      <Radio.Group onChange={onChange} value={selectedIndicatorsRd}>
        <Space direction="vertical">
          {indicatorsRd.map((item, index) => (
            <Radio key={index} value={item} style={{ height: "5vh" }}>
              {item}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}
