import { Checkbox, Divider, Button } from 'antd';
import React, { useState } from 'react';
const CheckboxGroup = Checkbox.Group;

const CheckMultipleComponent = ({ useData, dataName, setCheckData, setSelectedData }) => {
  const [checkedList, setCheckedList] = useState(useData);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(true);

  const onChange = (list) => {
    setCheckedList(list)
    setCheckData(list)
    setIndeterminate(!!list.length && list.length < useData.length);
    setCheckAll(list.length == useData.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? useData : []);
    setCheckData(e.target.checked ? useData : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return (<>
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      {dataName}
    </Checkbox>
    <Button onClick={() => {
        let useRegion = "("
        for(let i of checkedList){
          useRegion += '"' +  i + '" ,'
        }

      setSelectedData(checkedList)
    }}>
      搜索
    </Button>
    <Divider />
    <CheckboxGroup options={useData} value={checkedList} onChange={onChange} />
  </>)
};

export default CheckMultipleComponent;