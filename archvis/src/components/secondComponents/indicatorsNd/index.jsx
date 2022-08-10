import { Radio, Space } from 'antd';
import React from 'react';


export default function SecondIndicatorsNdSelect({ setSelectedIndicatorsNd }) {
  const IndicatorsNd = ["1", "2", "3", "4", "5"]
  const onChange = (e) => {
    setSelectedIndicatorsNd(e.target.value)
  };
  return (
    <div style={{ paddingTop: "5%" }}>
      <Radio.Group onChange={onChange} defaultValue={IndicatorsNd[0]}>
        <Space direction="vertical">
          {IndicatorsNd.map((item, index) => (
            <Radio key={index} value={item} style = {{height: "5vh"}}>
              {item}
            </Radio>
          ))}

        </Space>
      </Radio.Group>
    </div>
  )
}
