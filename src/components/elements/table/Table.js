import React from "react";
import { Table, Typography } from "antd";
import "./Table.css";
const CustomTable = ({
  column,
  rows,
  className,
  pagination,
  loading,
  id,
  labelTitle,
  expandable,
  onChange,
  locale,
  scroll,
  prefixCls,
  style,
  bordered,
}) => {
  console.log("CustomTable", className);

  return (
    <>
      <h4 className="labelTitle">{labelTitle}</h4>
      <Table
        bordered={bordered}
        rowClassName={id}
        columns={column}
        dataSource={rows}
        className={className}
        loading={loading}
        onChange={onChange}
        pagination={pagination}
        expandable={expandable}
        locale={locale}
        prefixCls={prefixCls}
        scroll={scroll}
        style={style}
      />
    </>
  );
};

export default CustomTable;
