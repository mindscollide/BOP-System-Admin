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
  labelClass1,
  labelClass2,
}) => {
  return (
    <>
      <div className={classNameDiv}>
        <p className={`${"m-0"} ${labelClass1}`}>{label}</p>
        <Checkbox
          className={className}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        >
          {children}
        </Checkbox>
        <p className={`${"m-0"} ${labelClass2}`}>{label2}</p>
      </div>
    </>
  );
};
export default CustomCheckbox;
