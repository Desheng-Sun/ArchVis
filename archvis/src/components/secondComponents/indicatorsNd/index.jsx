import { Radio, Space } from 'antd';
import React, { useState, useEffect }  from 'react';
import { secondIndicators } from '../../../apis/api'
import "./index.css"


export default function SecondIndicatorsNdSelect({ selectedIndustrySecond, setSelectedIndicatorsNd }) {
  const [industry, setIndustry] = useState('constru');
  const [indicatorsNd, setIndicatorsNd] = useState([]);

  useEffect(() => {
    if (selectedIndustrySecond === '施工行业') {
      setIndustry('constru');
    }
    else if (selectedIndustrySecond === '设计行业') {
      setIndustry('design');
    }
  }, [selectedIndustrySecond])

  useEffect(() => {
    secondIndicators(industry).then((res) =>{
      var tmp = [];
      for (let i in res) {
        if (res[i].level === 2) {
          tmp.push(res[i].indi_name);
        }
        else if (res[i].level === 3) {
          break;
        }
      }
      setIndicatorsNd(tmp);
    });
  }, [industry])

  const onChange = (e) => {
    setSelectedIndicatorsNd(e.target.value)
  };
  return (
    <div id ="secondIndicatorsNdSelect">
      <Radio.Group onChange={onChange}>
        <Space direction="vertical">
          {indicatorsNd.map((item, index) => (
            <Radio key={index} value={item} style = {{height: "5vh"}}>
              {item}
            </Radio>
          ))}

        </Space>
      </Radio.Group>
    </div>
  )
}
