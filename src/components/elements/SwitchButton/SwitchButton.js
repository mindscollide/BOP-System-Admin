import React from "react";
import { Switch } from "antd";

const CustomSwitch = ({
  checked,
  onChange,
  size,
  className,
  disabled,
  defaultChecked,
  loading,
  checkedChildren,
  unCheckedChildren,
}) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      size={size}
      className={className}
      disabled={disabled}
      defaultChecked={defaultChecked}
      loading={loading}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
    />
  );
};

export default CustomSwitch;
