import { Select } from "antd";
import React, { useState, useEffect } from "react";
import '../../../App';
import { secondEnterprise } from '../../../apis/api';

const { Option } = Select;

export default function SecondSearchBar({ nowEnterprise, setSelectedIndustry, setNowEnterprise }) {
  const allIndustry = ["施工行业", "设计行业"]
  const [construEnterprise, setConstruEnterprise] = useState([]);
  const [designEnterprise, setDesignEnterprise] = useState([]);
  const [NowEnterpriseList, setNowEnterpriseList] = useState([]);
  useEffect(() => {
    secondEnterprise('constru').then((res) => {
      var tmp = [];
      for (let i in res) {
        tmp.push(res[i].企业名称);
      }
      setConstruEnterprise(tmp);
      setNowEnterpriseList(tmp);
      setNowEnterprise([tmp[0]]);
      // console.log(tmp);
    });

    secondEnterprise('design').then((res) => {
      var tmp = [];
      for (let i in res) {
        tmp.push(res[i].企业名称);
      }
      setDesignEnterprise(tmp);
      // console.log(tmp);
    });

  }, [])

  const handleIndustryChange = (value) => {
    setSelectedIndustry(value);
    if (value === "施工行业") {
      setNowEnterpriseList(construEnterprise);
      setNowEnterprise(construEnterprise[0]);
    }
    else if (value === "设计行业") {
      setNowEnterpriseList(designEnterprise);
      setNowEnterprise(designEnterprise[0]);
    }
  };

  const onNowEnterprise = (value) => {
    setNowEnterprise(value);
  };
  return (
    <div style={{ height: "27.2vh", width: "100%" }}>
      <div style={{ height: "30%", paddingTop: "5%" }}>
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
          showArrow
          showSearch
          mode="multiple"
          style={{
            width: "80%",
          }}
          value={nowEnterprise}
          onChange={onNowEnterprise}
        >
          {NowEnterpriseList.map((industry) => (
            <Option key={industry}>{industry}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
}


