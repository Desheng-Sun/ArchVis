import { Select, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "./index"
import '../../../App';
import { useState } from "react";
const { Option, OptGroup } = Select;

export default function FirstSearchBar() {

  const allIndustry = ["建筑业（施工与设计加总）", "施工行业", "设计行业"]
  const allIndex = ["全部指标", "基本指标", "数字研发创新指标", "组织指标", "战略指标", "行业特色指标"]
  const allRegion = ["全国", "东北", "华北", "中原", "西北", "西南"]
  const [nowIndustry, setNowIndustry] = useState(allIndustry[0]);
  const [nowIndex, setNowIndex] = useState(allIndex[0]);
  const [nowRegion, setNowRegion] = useState(allRegion[0]);


  const searchIndex = (value) => {
    console.log(value)
    if (value.length === 0) {
      setNowIndex()
    }
    else {

      if (value.indexOf(allIndex[0]) == 0 && value[value.length - 1] !== allIndex[0]) {
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
      if (value.indexOf(allRegion[0]) == 0 && value[value.length - 1] !== allRegion[0]) {
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
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    // setNowIndustry(value)
    console.log('search:', value);
  };


  function SelectComponent({ useData, changeData, searchData, nowSize, searchValue }) {
    return (
      <Select
        allowClear
        showArrow
        showSearch
        size={nowSize}
        value = {searchValue}
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
    <div style={{ height: "27.2vh", width: "100%" }}>
      <div style={{ height: "30%", paddingTop: "5%" }}>
        <SelectComponent
          useData={allIndustry}
          changeData={onChange}
          searchData={onSearch}
          searchValue = {nowIndustry}
        />
        <Button onClick = {() => {
          console.log(nowIndustry)
        }}>
          搜索
        </Button>
      </div>
      <div style={{ height: "30%", paddingTop: "5%" }}>
        <SelectMultipleComponent
          useData={allIndex}
          changeData={searchIndex}
          searchValue={nowIndex}
        />
        <Button onClick = {() => {
          console.log(nowIndex)
        }}>
          搜索
        </Button>
      </div>
      <div style={{ height: "30%", paddingTop: "5%" }}>
        <SelectMultipleComponent
          useData={allRegion}
          changeData={searchRegion}
          searchValue={nowRegion}
        />
        <Button onClick = {() => {
          console.log(nowRegion)
        }}>
          搜索
        </Button>
      </div>
    </div>
  );
}

