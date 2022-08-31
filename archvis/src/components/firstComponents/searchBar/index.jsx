import { Select, Button, Checkbox, Divider } from "antd";
import "./index.css"
import '../../../App';
import { useState } from "react";
import { firstArchIndustry } from "../../../apis/api";
import CheckMultipleComponent from "./checkMultple";

const { Option, OptGroup } = Select;


export default function FirstSearchBar({setSelectdIndustryFirst, setSelectedIndexFirst, setSelectedRegionFirst}) {
  const allIndustry = ["建筑业（施工与设计加总）", "施工行业", "设计行业"]
  const allIndex = ["全部指标", "基本指标", "数字研发创新指标", "组织指标", "战略指标", "行业特色指标"]
  const allRegion = ["全国", "东北", "华北", "华东", "华中", "华南", "西北", "西南", "港澳台"]
  
  const allIndustry2 = ["施工行业", "设计行业"]
  const allIndex2 = ["基本指标", "数字研发创新指标", "组织指标", "战略指标", "行业特色指标"]
  const allRegion2 = ["东北", "华北", "华东", "华中", "华南", "西北", "西南", "港澳台"]
  const [nowIndustry, setNowIndustry] = useState(allIndustry[0]);
  const [nowIndex, setNowIndex] = useState(allIndex2);
  const [nowRegion, setNowRegion] = useState(allRegion2);

  const searchIndex = (value) => {
    if (value.length === 0) {
      setNowIndex()
    }
    else {
      if (value.indexOf(allIndex[0]) === 0 && value[value.length - 1] !== allIndex[0]) {
        value.splice(0, 1)
      }
      else if (value[value.length - 1] === allIndex[0]) {
        value = [allIndex[0]]
      }
      setNowIndex(value)
    }
  };

  const searchRegion = (value) => {
    if (value.length === 0) {
      setNowRegion()
    }
    else {
      if (value.indexOf(allRegion[0]) === 0 && value[value.length - 1] !== allRegion[0]) {
        value.splice(0, 1)
      }
      else if (value[value.length - 1] === allRegion[0]) {
        value = [allRegion[0]]
      }
      setNowRegion(value)
    }
  };

  const onChange = (value) => {
    setNowIndustry(value)
  };

  const onSearch = (value) => {
    // setNowIndustry(value)
  };


  function SelectComponent({ useData, changeData, searchData, nowSize, searchValue }) {
    return (
      <Select
        // allowClear
        showArrow
        showSearch
        size={nowSize}
        value={searchValue}
        onChange={changeData}
        onSearch={searchData}
        style={{ width: '60%' }}
      >
        {useData.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    )
  }

  function SelectMultipleComponent({ useData, changeData, searchValue }) {
    return (
      <Select
        allowClear
        showArrow
        showSearch
        autoClearSearchValue={"false"}
        mode="multiple"
        value={searchValue}
        onChange={changeData}
        style={{ width: '60%' }}
      >
        <OptGroup label="全部">
          <Option key={useData[0]} value={useData[0]}>
            {useData[0]}
          </Option>
        </OptGroup>
        <OptGroup label="分类">
          {useData.slice(1, useData.length).map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </OptGroup>
      </Select>
    )
  }


  return (
    <div style={{ height: "32.2vh", width: "100%" }}>
      <div className="multipleCheck" style={{ height: "25%", width: "100%" }}>
        {/* <SelectComponent
          useData={allIndustry}
          changeData={onChange}
          searchData={onSearch}
          searchValue={nowIndustry}
        />
        <Button onClick={() => {
          firstArchIndustry(nowIndustry).then((res) => {
            // let result = res;
            console.log(res)
          })
          console.log(nowIndustry)
        }}>
          搜索
        </Button> */}
        <CheckMultipleComponent
          useData={allIndustry2}
          dataName="建筑业（施工与设计加总）"
          setCheckData={setNowIndustry}
          setSelectedData = {setSelectdIndustryFirst}
        />
      </div>
      <div className="multipleCheck">
        {/* <SelectMultipleComponent
          useData={allIndex}
          changeData={searchIndex}
          searchValue={nowIndex}
        /> */}
        <CheckMultipleComponent
          useData={allIndex2}
          dataName="全部指标"
          setCheckData={setNowIndex}
          setSelectedData = {setSelectedIndexFirst}
        />
      </div>
      <div className="multipleCheck">
        {/* <SelectMultipleComponent
          useData={allRegion}
          changeData={searchRegion}
          searchValue={nowRegion}
        /> */}
        {/* <Button onClick={() => {
          console.log(nowRegion)
        }}>
          搜索
        </Button> */}
        <CheckMultipleComponent
          useData={allRegion2}
          dataName="全国"
          setCheckData={setNowRegion}
          setSelectedData = {setSelectedRegionFirst}
        />

      </div>
    </div>
  );
}

