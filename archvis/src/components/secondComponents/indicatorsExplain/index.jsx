import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
// import { secondExplain } from '../../../apis/api';


export default function SecondIndicatorsRdExplain({ selectedIndustry, selectedIndicatorsNd, selectedIndicatorsRd }) {
  const [nowIndicatorsRdExplain, setNowIndicatorsRdExplain] = useState();

  useEffect(() => {
    let industry = ""
    if (firstArchIndustry === '施工行业') {
      industry = 'constru';
    }
    else if (firstArchIndustry === '设计行业') {
      industry = 'design';
    }
    if (selectedIndicatorsRd !== undefined) {
      secondExplain(industry).then((res) => {
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
  }, [selectedIndustry, selectedIndicatorsNd, selectedIndicatorsRd])
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
    <div style={{ height: "41vh", width: "100%", fontSize: "5vh" }}>
      <Form>
        <ExlpainItem
          labelName="指标解释"
          defaultValue={nowIndicatorsRdExplain}
        />
      </Form>
    </div>
  )
}
