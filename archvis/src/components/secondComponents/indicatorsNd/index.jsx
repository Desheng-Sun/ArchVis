import { Radio, Space } from 'antd';
import React, { useState, useEffect }  from 'react';
import { selectIndicators } from '../../../apis/api';

export default function SecondIndicatorsNdSelect({ selectedIndustry, indicatorsNd, setSelectedIndicatorsNd, setIndicatorsNd }) {
  const [industry, setIndustry] = useState('constru');
  // const [IndicatorsNd, setIndicatorsNd] = useState([]);

  useEffect(() => {
    if (selectedIndustry == '施工行业') {
      setIndustry('constru');
    }
    else if (selectedIndustry == '设计行业') {
      setIndustry('design');
    }
  }, [selectedIndustry])

  useEffect(() => {
    selectIndicators(industry).then((res) =>{
      var tmp = [];
      for (let i in res) {
        if (res[i].level == 2) {
          tmp.push(res[i].indi_name);
        }
        else if (res[i].level == 3) {
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
    <div style={{ paddingTop: "5%" }}>
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
