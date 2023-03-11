import { Select } from "antd";
import React, { useState, useEffect } from "react";
import '../../../App';
import { secondEnterprise } from '../../../apis/api';

const { Option } = Select;

export default function SecondSearchBar({ nowEnterprise, setSelectedIndustrySecond, setNowEnterprise }) {
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
    });

    secondEnterprise('design').then((res) => {
      var tmp = [];
      for (let i in res) {
        tmp.push(res[i].企业名称);
      }
      setDesignEnterprise(tmp);
    });

  }, [])

  const handleIndustryChange = (value) => {
    setSelectedIndustrySecond(value);
    if (value === "施工行业") {
      setNowEnterpriseList(construEnterprise);
      setNowEnterprise([construEnterprise[0]]);
    }
    else if (value === "设计行业") {
      setNowEnterpriseList(designEnterprise);
      setNowEnterprise([designEnterprise[0]]);
    }
  };

  const onNowEnterprise = (value) => {
    setNowEnterprise(value);
  };

  return (
    <div style={{ height: "37.2vh", width: "100%" }}>
      <div 
        style={{ 
          // height: "40%", 
          padding: "10%" 
        }}
      >
        <Select
          defaultValue={allIndustry[0]}
          style={{
            width: "20%",
            // width: "80%",
          }}
          onChange={handleIndustryChange}
        >
          {allIndustry.map((industry) => (
            <Option key={industry}>{industry}</Option>
          ))}
        </Select>
        <Select
          showArrow
          showSearch
          mode="multiple"
          style={{
            width: "70%",
            paddingLeft: "5%"
            // width: "80%",
          }}
          value={nowEnterprise}
          onChange={onNowEnterprise}
        >
          {NowEnterpriseList.map((industry) => (
            <Option key={industry}>{industry}</Option>
          ))}
        </Select>
      </div>
      {/* <div style={{ height: "40%", paddingTop: "5%" }}>
        <Select
          allowClear
          showArrow
          showSearch
          mode="multiple"
          style={{
            width: "40%",
            // width: "80%",
          }}
          value={nowEnterprise}
          onChange={onNowEnterprise}
        >
          {NowEnterpriseList.map((industry) => (
            <Option key={industry}>{industry}</Option>
          ))}
        </Select>
      </div> */}
    </div>
  );
}


