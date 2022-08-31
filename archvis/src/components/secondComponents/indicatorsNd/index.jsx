import { Radio, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { secondIndicators } from '../../../apis/api'
import "./index.css"


export default function SecondIndicatorsNdSelect({ selectedIndustrySecond, selectedIndicatorsNd, setSelectedIndicatorsNd }) {
  const [industry, setIndustry] = useState('constru');
  const [indicatorsNd, setIndicatorsNd] = useState([]);
  const [nowIndicatorsExplain, setNowIndicatorsExplain] = useState("")
  const [isShow, setIsShow] = useState(false)

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
    var tmp = [];
    for (let i in industry) {
      if (industry[i].level === 2) {
        tmp.push(industry[i].indi_name);
      }
      else if (industry[i].level === 3) {
        break;
      }
    }
    setIndicatorsNd(tmp);
    setIsShow(false)
  }, [industry])

  useEffect(() => {
    for (let i of industry) {
      if (i.indi_name === selectedIndicatorsNd) {
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
  }, [selectedIndicatorsNd])
  const onChange = (e) => {
    setSelectedIndicatorsNd(e.target.value)
    for (let i of industry) {
      if (i.indi_name === e.target.value) {
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
  };
  return (
    <div id="secondIndicatorsNdSelect">
      <Radio.Group onChange={onChange} value={selectedIndicatorsNd}>
        <Space direction="vertical">
          {indicatorsNd.map((item, index) => (
            <Radio key={index} value={item} style={{ height: "5vh" }}>
              {item}
            </Radio>
          ))}

        </Space>
      </Radio.Group>
      {
        isShow ? (
          <div id="secondIndicatorsNdExplain"></div>
        ) : null
      }      
      {
        isShow ? (
          <div id="secondIndicatorsNdExplainText">{nowIndicatorsExplain}</div>
        ) : null
      }
    </div>
  )
}
