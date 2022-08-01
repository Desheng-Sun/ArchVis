import { Radio } from 'antd';
import React from 'react';


export default function SecondIndicatorsNdSelect({setSelectedIndicatorsNd}) {
  const IndicatorsNd = ["1", "2", "3", "4", "5"]
  const onChange = (e) => {
    setSelectedIndicatorsNd(e.target.value)
  };
  return (
    <>
      <Radio.Group onChange={onChange} defaultValue={IndicatorsNd[0]}>
        {IndicatorsNd.map((item, index) => (
          <Radio.Button key={index} value={item}>
            {item}
          </Radio.Button>
        ))}
      </Radio.Group>
    </>
  )
}
