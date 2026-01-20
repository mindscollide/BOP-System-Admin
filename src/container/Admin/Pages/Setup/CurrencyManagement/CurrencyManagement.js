import React, { useEffect, useState } from "react";
import styles from "./CurrencyManagement.module.css";
import {
  Button,
  Checkbox,
  CustomPaper,
  CustomRadio,
  TextField,
  Table,
} from "../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GetInstrumentApplicabilityAPI } from "../../../../../store/actions/SpreadManagementActions";
import {
  SaveInstrumentApplicabilitySystemAdminModal,
  setSelectedInstrument,
} from "../../../../../store/actions/BOPSystemAdminModalsActions";
import CurrencyModal from "./CurrencyManagementModal/CurrencyModal";

const CurrencyManagement = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState([]);

  const CurrencyManagementData = useSelector(
    (state) => state.SpreadManagementReducer.CurrencyManagementData
  );
  const saveInstrumentModal = useSelector(
    (state) => state.BOPSystemAdminModal.saveInstrumentModal
  );
  console.log(CurrencyManagementData, "CurrencyManagementData");

  useEffect(() => {
    dispatch(GetInstrumentApplicabilityAPI(navigate));
  }, []);

  useEffect(() => {
    if (CurrencyManagementData?.instruments?.length > 0) {
      const mappedData = CurrencyManagementData.instruments.map((item) => ({
        key: item.pK_IntrumentID,
        shortCode: item.instrumentName,
        isDefaultCurrency: item.isDefaultCurrency, // agar description alag field se aa rahi hai toh wo lagao
        forwardApplicable: item.forwardApplicable,
        discountingApplicable: item.discountApplicable,
        nonFEApplicable: item.nonFEApplicable, // <-- yaha add kiya
      }));
      setDataSource(mappedData);
    }
  }, [CurrencyManagementData]);

  const columns = [
    {
      title: <label className="px-2">Short Code</label>,
      dataIndex: "shortCode",
      key: "shortCode",
      width: "100px",
      ellipsis: true,
      align: "left",
    },
    {
      title: <label className="px-2">is Default Currency</label>,
      dataIndex: "isDefaultCurrency",
      key: "isDefaultCurrency",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text) =>
        text ? (
          <i className="icon-check color-green"></i>
        ) : (
          <i className="icon-close color-red"></i>
        ),
    },
    {
      title: <label className="px-3">Forward Applicable</label>,
      dataIndex: "forwardApplicable",
      key: "forwardApplicable",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text) =>
        text ? (
          <i className="icon-check color-green"></i>
        ) : (
          <i className="icon-close color-red"></i>
        ),
    },
    {
      title: <label className="px-3">FE Discounting Applicable</label>,
      dataIndex: "discountingApplicable",
      key: "discountingApplicable",
      width: "100px",
      ellipsis: true,
      align: "center",

      render: (text) =>
        text ? (
          <i className="icon-check color-green"></i>
        ) : (
          <i className="icon-close color-red"></i>
        ),
    },
    {
      title: <label className="px-3">Non-FE Discounting Applicable</label>,
      dataIndex: "nonFEApplicable",
      key: "nonFEApplicable",
      width: "100px",
      align: "center",
      render: (text) =>
        text ? (
          <i className="icon-check color-green"></i>
        ) : (
          <i className="icon-close color-red"></i>
        ),
    },
    {
      title: <label className="px-3">Edit</label>,
      key: "edit",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-2 justify-content-center align-items-center"
              >
                <Button
                  className={styles["EditButton"]}
                  icon={<i className="icon-edit color-blue"></i>}
                  onClick={() => {
                    console.log("Dispatching...");
                    dispatch(setSelectedInstrument(record));
                    dispatch(SaveInstrumentApplicabilitySystemAdminModal(true));
                  }}
                />
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  return (
    <>
      <section className={styles["CurrencymangementStyles"]}>
        <Row className="mt-4">
          <Col lg={6} md={6} sm={12}>
            <span className={styles["Currency-Management-Heading"]}>
              Currency Management
            </span>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={12} md={12} sm={12}>
            <CustomPaper className={styles["Currencymangement-List-paper"]}>
              <Table
                column={columns}
                pagination={false}
                rows={dataSource}
                className={"BankUserList-table"}
                scroll={{ y: 350, x: "scroll" }}
              />
            </CustomPaper>
          </Col>
        </Row>
      </section>

      {saveInstrumentModal && <CurrencyModal />}
    </>
  );
};

export default CurrencyManagement;
