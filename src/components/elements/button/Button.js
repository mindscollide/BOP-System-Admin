import React from "react";
import Button from "react-bootstrap/Button";

const CustomButton = ({
  text,
  icon,
  onClick,
  className,
  icon2,
  disableBtn,
  variant,
  size,
  color,
  align,
  type,
  onChange,
  style,
  pdfIcon,
  pdfIconClass,
  iconClass,
  i_conClass,
}) => {
  return (
    <>
      <Button
        type={type}
        color={color}
        size={size}
        className={className}
        variant={variant}
        disabled={disableBtn}
        onClick={onClick}
        onChange={onChange}
        align={align}
        style={style}>
        {i_conClass && <i className={i_conClass} />}
        <span className={iconClass}>{icon}</span>
        {text}
        {icon2}
        <img className={pdfIconClass} src={pdfIcon} alt='' />
      </Button>
    </>
  );
};

export default CustomButton;
