import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons'; // Import the FilterOutlined icon
import './checkbox.css'; 

const categories = [
  { _id: 'Gaming', name: 'Gaming' },
  { _id: 'Nature', name: 'Nature' },
  { _id: 'Creativity', name: 'Creativity' },
  { _id: 'Festivals', name: 'Festivals' },
  { _id: 'Sports', name: 'Sports' },
  { _id: 'Culinary', name: 'Culinary' },
  { _id: 'Adventure', name: 'Adventure' },
  { _id: 'Health', name: 'Health' },
];

export default function CheckBoxComponent(props) {
  const [checked, setChecked] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

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

  const toggleCheckboxes = () => {
    setShowCheckboxes((prevValue) => !prevValue);
  };

  const renderCheckboxes = () =>
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

  return (
    <div className="checkbox-container">
      <Button onClick={toggleCheckboxes} icon={<FilterOutlined />} className="filter-button">
        Filter
      </Button>
      {showCheckboxes && (
        <div className="checkbox-list-container">
          {renderCheckboxes()}
        </div>
      )}
    </div>
  );
}
