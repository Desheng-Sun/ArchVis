import { Select } from "antd";
import React, { useState } from "react";
import '../../../App';

const { Option } = Select;

export default function ThirdSearchBar() {
  const allIndustry = ["施工行业", "设计行业"]
  const allEnterprise = { 施工行业: ["1", "2", "3"], 设计行业: ["4", "5", "6"] }

  const [nowIndustry, setNowIndustry] = useState(allEnterprise[allIndustry[0]]);
  const [nowEnterprise, setNowEnterprise] = useState(allEnterprise[allIndustry[0]][0]);

  const handleIndustryChange = (value) => {
    setNowIndustry(allEnterprise[value]);
    setNowEnterprise(allEnterprise[value][0]);
  };

  const onNowEnterprise = (value) => {
    setNowEnterprise(value);
  };

  return (
    <div style={{ height: "27.2vh", width: "100%" }}>

      <div style={{ height: "40%", paddingTop: "5%" }}>
        <Select
          defaultValue={allIndustry[0]}
          style={{
            width: "80%",
          }}
          onChange={handleIndustryChange}
        >
          {allIndustry.map((industry) => (
            <Option key={industry}>{industry}</Option>
          ))}
        </Select>
      </div>
      <div style={{ height: "40%", paddingTop: "5%" }}>
        <Select
          allowClear
          showArrow
          showSearch
          style={{
            width: "80%",
          }}
          value={nowEnterprise}
          onChange={onNowEnterprise}
        >
          {nowIndustry.map((industry) => (
            <Option key={industry}>{industry}</Option>
          ))}
        </Select>
      </div>


    </div>
  );
}


