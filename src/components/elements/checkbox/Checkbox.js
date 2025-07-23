import React from "react";
import "./Checkbox.css";
import { Checkbox } from "antd";

const CustomCheckbox = ({
  label,
  label2,
  checked,
  onChange,
  classNameDiv,
  disabled,
  className,
  children,
}) => {
  return (
    <>
      <div className={classNameDiv}>
        <p className="m-0">{label}</p>
        <Checkbox
          className={className}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        >
          {children || label2}
        </Checkbox>
        <p className="m-0">{label2}</p>
      </div>
    </>
  );
};
export default CustomCheckbox;
