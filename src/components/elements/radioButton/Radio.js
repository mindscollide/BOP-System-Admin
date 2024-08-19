import React from "react";
import { Radio } from "antd";

const CustomRadio = ({
  options = [],
  onChange,
  value,
  name,
  size,
  className,
  disabled,
}) => {
  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      name={name}
      size={size}
      className={className}
      disabled={disabled}
    >
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default CustomRadio;
