import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
// import { secondExplain } from '../../../apis/api';


export default function SecondIndicatorsRdExplain({ selectedIndustry, selectedIndicatorsNd, selectedIndicatorsRd }) {
  const [industry, setIndustry] = useState('constru');
  const [nowIndicatorsRdExplain, setNowIndicatorsRdExplain] = useState();
  useEffect(() => {
    if (selectedIndustry === '施工行业') {
      setIndustry('constru');
    }
    else if (selectedIndustry === '设计行业') {
      setIndustry('design');
    }
  }, [selectedIndustry])
  useEffect(() => {
    if (selectedIndicatorsRd !== undefined) {
      secondExplain(industry).then((res) => {
        console.log(res);
        if (res[0].explanation != null) {
          setNowIndicatorsRdExplain(res[0].explanation);
        }
        else {
          secondExplain(industry, res[0].parent_id).then((res) => {
            setNowIndicatorsRdExplain(res[0].explanation);
          })
        }
      });
    }
  }, [industry, selectedIndicatorsNd, selectedIndicatorsRd])
  function ExlpainItem({ labelName, defaultValue }) {
    return (
      <div style={{ paddingTop: "5vh", height: "15vh" }}>
        <Form.Item
          label={labelName}
        >
          <Input defaultValue={defaultValue} readOnly />
        </Form.Item>
      </div>
    )
  }
  return (
    <div style={{height:"41vh", width:"100%", fontSize:"5vh"}}>
      <Form>
        <ExlpainItem
          labelName="指标解释"
          defaultValue={nowIndicatorsRdExplain}
        />
      </Form>
    </div>
  )
}
