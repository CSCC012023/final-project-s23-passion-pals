import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';
import './checkbox.css'; 

const { Panel } = Collapse;
// Define an array of categories
const categories = [
    { _id: 'Sports', name: 'Sports' },
    { _id: 'Music', name: 'Music' },
    { _id: 'Group Outings', name: 'Group Outings' },
    { _id: 'Education', name: 'Education' },
    { _id: 'Culture', name: 'Culture' },
    { _id: 'Adventure', name: 'Adventure' }
];
  // Handle toggle function to add/remove checked category
export default function CheckboxComponent(props) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };
 // Render checkbox lists based on categories
  const renderCheckboxLists = () =>
    categories.map((value, index) => (
      <label key={index} className="checkbox-label">
        <Checkbox
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          checked={checked.indexOf(value._id) !== -1}
          className="checkbox" 
        />
        <span>{value.name}</span>
      </label>
    ));
  // Render the checkbox component

  return (
    <div className="checkbox-container">
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Categories" key="1" className="collapse-header">
          <div className="collapse-content">
            <div className="checkbox-list">{renderCheckboxLists()}</div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
