import { Radio, Space } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import { secondIndicators } from '../../../apis/api';
import "./index.css"


export default function SecondIndicatorsRdSelect({ selectedIndustrySecond, selectedIndicatorsNd, selectedIndicatorsRd, setSelectedIndicatorsRd }) {
  const [industry, setIndustry] = useState([]);
  const [indicatorsRd, setIndicatorsRd] = useState([]);
  const [nowIndicatorsExplain, setNowIndicatorsExplain] = useState("")
  const [isShow, setIsShow] = useState(false)
  const onChange = (e) => {
    setSelectedIndicatorsRd(e.target.value)
    for (let i of industry) {
      if (i.indi_name === e.target.value) {
        setNowIndicatorsExplain(i.indi_name + "：" + i.explanation)
        if (i.explanation !== null) {
          setIsShow(true)
        }
        else {
          setIsShow(false)
        }
      }
    }
  };
  useEffect(() => {
    if (selectedIndustrySecond === '施工行业') {
      secondIndicators('constru').then((res) => {
        setIndustry(res)
      })
    }
    else if (selectedIndustrySecond === '设计行业') {
      secondIndicators('design').then((res) => {
        setIndustry(res)
      })
    }
  }, [selectedIndustrySecond])
  useEffect(() => {
    if (industry.length > 0) {
      let tmp = {};
      for (let i in industry) {
        if (industry[i].level === 2) {
          tmp[industry[i].indi_name] = [];
          for (let j in industry) {
            if (industry[j].parent_id === industry[i].id) {
              tmp[industry[i].indi_name].push(industry[j].indi_name);
            }
          }
        }
      }
      setIndicatorsRd(tmp[selectedIndicatorsNd])
      setIsShow(false)
    }
  }, [industry, selectedIndicatorsNd])
  useEffect(() => {
    for (let i of industry) {
      if (i.indi_name === selectedIndicatorsRd) {
        setNowIndicatorsExplain(i.indi_name + "：" + i.explanation)
        console.log(i.explanation)
        if (i.explanation !== null) {
          setIsShow(true)
        }
        else {
          setIsShow(false)
        }
      }
    }
  }, [selectedIndicatorsRd])
  return (
    <div id="secondIndicatorsRdSelect" >
      <Radio.Group onChange={onChange} value={selectedIndicatorsRd}>
        <Space direction="vertical">
          {indicatorsRd.map((item, index) => (
            <Radio key={index} value={item} style={{ height: "5vh" }}>
              {item}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      {
        isShow ? (
          <div id="secondIndicatorsRdExplain">{nowIndicatorsExplain}</div>
        ) : null
      }
    </div>
  )
}
