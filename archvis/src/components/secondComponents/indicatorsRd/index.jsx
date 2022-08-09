import { Radio } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';


export default function SecondIndicatorsRdSelect({selectedIndicatorsNd, setSelectedIndicatorsRd}) {
  const IndicatorsNd = { "1": ["11", "12", "13"], "2": ["21", "22", "23"], "3": ["31", "32", "33"], "4": ["41", "42", "43"], "5": ["51", "52", "53"] }
  const [indicatorsRd, setIndicatorsRd] = useState(IndicatorsNd[selectedIndicatorsNd])
  const onChange = (e) => {
    setSelectedIndicatorsRd(e.target.value)
  };
  useEffect(() => {
    if (selectedIndicatorsNd !== undefined) {
      setIndicatorsRd(IndicatorsNd[selectedIndicatorsNd])
    }
  }, [selectedIndicatorsNd])
  return (
    <div style={{ paddingTop: "5%" }}>
      <Radio.Group onChange={onChange} defaultValue={indicatorsRd[0]}>
        {indicatorsRd.map((item, index) => (
          <Radio key={index} value={item}>
            {item}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  )
}
