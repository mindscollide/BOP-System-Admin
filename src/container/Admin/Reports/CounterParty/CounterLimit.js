import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CustomPaper,
  Table,
  Notification,
  Loader,
  Button,
} from "../../../../components/elements";
import CounterModal from "../../AdminModal/CounterPartyModal/CounterModal";
import CounterPartyModal from "../../AdminModal/CounterPartyUplaodModal/CounterPartyModal";
import { Spin, Upload } from "antd";
import "./CounterLimit.css";

const CounterLimit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  console.log(file, "filefile");
  const { systemReducer, uploadReducer, downloadReducer } = useSelector(
    (state) => state
  );
  console.log(systemReducer, "systemReducersystemReducer");

  //get bankID from local storage
  let CounterPartyModalBankId =
    localStorage.getItem("bankID") != undefined &&
    localStorage.getItem("bankID") != null
      ? localStorage.getItem("bankID")
      : 1;

  // state for row in which table data set
  const [rows, setRows] = useState([]);

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  // modal for countery party limit state
  const [counterPartyModal, setCounterPartyModal] = useState(false);

  // upload file modal for counter party
  const [counterUploadModal, setCounterUploadModal] = useState(false);

  // view Counter party modal
  const [viewCounterModal, setViewCounterModal] = useState({
    counterFileType: {
      value: 3,
      errorMessage: "",
      errorStatus: false,
    },
    corporateName: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    avaliableLimit: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    instrumentName: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    weightage: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    instrumentAvaliableLimit: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

  //open counterParty modal on click
  const openCounterModal = (record) => {};

  // download report in Add Bank user page
  const downloadReportCounterParty = async () => {};

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      let counterUploadFile = info.file.originFileObj;
      let ext = info.file.originFileObj.name.split(".").pop();
      if (ext === "xls" || ext === "xlsx") {
        // dispatch(
        //   counterPartyUpload(
        //     navigate,
        //     counterUploadFile,
        //     setCounterUploadModal,
        //     setFile
        //   )
        // );
      }
    },
  };

  // column for Counter Limit
  const counterColumns = [
    {
      title: <label className="bottom-table-header">Company Name</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "300px",
      ellipsis: true,
      align: "left",
      render: (text) => (
        <label className="counterLimit-company-text">{text}</label>
      ),
    },
    {
      title: <label className="bottom-table-header">View</label>,
      dataIndex: "view",
      key: "view",
      align: "center",
      width: "180px",
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <label
            className="icon-eye eyeicon-counter"
            onClick={() => openCounterModal(record)}
          >
            {text}
          </label>
        );
      },
    },
  ];

  return (
    <section className="SectionContainer">
      {/* <Row>
        <Col lg={12} md={12} sm={12}></Col>
      </Row> */}
      <Row className="mt-2">
        <Col lg={6} md={6} sm={12} className="mt-2">
          <span className="counterLimit-label">Counter Party Limit</span>
        </Col>
        <Col lg={6} md={6} sm={12} className="col-upper-button-class">
          <Button
            text="Download excel format"
            onClick={downloadReportCounterParty}
            className="Counter-party-download-formater"
          />
          <Upload showUploadList={false} {...props}>
            <Button
              className="Counter-party-upload-modal"
              text="Upload Counter Party Limit"
            />
          </Upload>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className="counterLimit-paper">
            <Row>
              <Col lg={12} md={12} sm={12}>
                {systemReducer.Spinner === true ? (
                  <span className="counter-Limit-user-spinner">
                    <Spin size="large" />
                  </span>
                ) : (
                  <Table
                    column={counterColumns}
                    rows={rows}
                    pagination={false}
                    className="counterLimit-table"
                  />
                )}
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {counterPartyModal ? (
        <>
          <CounterModal
            modalCounter={counterPartyModal}
            setModalCounter={setCounterPartyModal}
          />
        </>
      ) : null}

      {counterUploadModal ? (
        <>
          <CounterPartyModal
            uploadCounterModal={counterUploadModal}
            setUploadCounterModal={setCounterUploadModal}
          />
        </>
      ) : null}
      {systemReducer.Loading ||
      uploadReducer.Loading ||
      downloadReducer.Loading ? (
        <Loader />
      ) : null}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </section>
  );
};

export default CounterLimit;
