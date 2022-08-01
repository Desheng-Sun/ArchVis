import { Select } from "antd";
import "./index"
import '../../../App';

const { Option } = Select;

export default function FirstSearchBar() {
  const allIndustry = ["建筑业（施工与设计加总）", "施工行业", "设计行业"]
  const allIndex = ["全部指标", "基本指标", "数字研发创新指标", "组织指标", "战略指标", "行业特色指标"]
  const allRegion = ["全国", "东北", "华北", "中南", "西北", "西南"]


  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  function SelectComponent({ useData, changeData, searchData }) {
    return (
      <Select
        allowClear
        showArrow
        showSearch
        defaultValue={useData[0]}
        onChange={changeData}
        onSearch={searchData}
        style={{ width: '80%' }}
      >
        {useData.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    )
  }

  function SelectMultipleComponent({ useData, changeData }) {
    return (
      <Select
        allowClear
        showArrow
        showSearch
        mode="multiple"
        defaultValue={[useData[0]]}
        onChange={changeData}
        style={{ width: '80%' }}
      >
        {useData.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    )
  }
  return (
    <div style={{ height: "100%"}}>
      <div style={{ height: "30%", paddingTop: "5%", }}>
        <SelectComponent
          useData={allIndustry}
          changeData={onChange}
          searchData={onSearch}
        />
      </div>
      <div style={{ height: "30%", paddingTop: "5%" }}>
        <SelectMultipleComponent
          useData={allIndex}
          changeData={handleChange}
        />
      </div>
      <div style={{ height: "30%", paddingTop: "5%" }}>
        <SelectMultipleComponent
          useData={allRegion}
          changeData={handleChange}
        />
      </div>
    </div>
  );
}

