import React, { Fragment, useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
  Loader,
} from "../../../../components/elements";
import "./CounterPartyModal.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CounterPartyModal = ({ uploadCounterModal, setUploadCounterModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uploadReducer, systemReducer } = useSelector((state) => state);
  console.log(uploadReducer, "uploadReduceruploadReduceruploadReducer");

  const [validCorporates, setValidCorporates] = useState([]);
  const [invalidCorporates, setInvalidCorporates] = useState([]);
  console.log(validCorporates, invalidCorporates, "excelDataexcelData");
  // for close modal handler
  const closeUploadCounterPartyModal = () => {
    setUploadCounterModal(false);
    setValidCorporates([]);
    setInvalidCorporates([]);
  };

  // for save counter party modal API
  const onSaveHit = () => {};

  useEffect(() => {
    if (
      uploadReducer.uploadValidCorporates !== null &&
      uploadReducer.uploadValidCorporates !== undefined
    ) {
      if (uploadReducer.uploadValidCorporates.validCorporates.length > 0) {
        let validCor = [];
        uploadReducer.uploadValidCorporates.validCorporates.map(
          (data, index) => {
            console.log("datadatadata", data);
            validCor.push(data);
          }
        );
        setValidCorporates(validCor);
      }
      if (uploadReducer.uploadValidCorporates.invalidCorporates.length > 0) {
        let invalidCor = [];
        uploadReducer.uploadValidCorporates.invalidCorporates.map(
          (data, index) => {
            console.log("datadatadata", data);
            invalidCor.push(data);
          }
        );
        setInvalidCorporates(invalidCor);
      }
    }
  }, [uploadReducer.uploadValidCorporates]);

  const columns = [
    {
      title: <label className="bottom-table-header"> Corporate Name</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "200px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Available Limit</label>,
      dataIndex: "avaliableLimit",
      key: "avaliableLimit",
      width: "200px",
      render: (text) => {
        return (
          <label className="issue-date-column">
            {text.toLocaleString("en-US")}
          </label>
        );
      },
    },
    {
      title: <label className="bottom-table-header">Instrument Type</label>,
      dataIndex: "instrumentType",
      key: "instrumentType",
      width: "200px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  const InValidColumn = [
    {
      title: <label className="bottom-table-header">Corporate Name</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "200px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Available Limit</label>,
      dataIndex: "avaliableLimit",
      key: "avaliableLimit",
      width: "200px",
      render: (text) => {
        return (
          <label className="issue-date-column">
            {text.toLocaleString("en-US")}
          </label>
        );
      },
    },
    {
      title: <label className="bottom-table-header">Instrument Type</label>,
      dataIndex: "instrumentType",
      key: "instrumentType",
      width: "200px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  return (
    <Fragment>
      <Modal
        show={uploadCounterModal}
        setShow={setUploadCounterModal}
        className="modaldialog counter-Party-Modal"
        modalHeaderClassName={"counter-Party-Modal-close-btn"}
        modalFooterClassName="counter-Party-Modal-footer"
        size="lg"
        onHide={closeUploadCounterPartyModal}
        ModalBody={
          <Fragment>
            {uploadCounterModal ? (
              <Fragment>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <span className="counter-Party-Modal-Title">
                      Valid Corporate
                    </span>
                    <Table
                      column={columns}
                      rows={validCorporates}
                      pagination={false}
                      // scroll={{ y: 150 }}
                      className="Counter-Party-Modal-table"
                    />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={12} md={12} sm={12}>
                    <span className="counter-Party-Modal-Title">
                      InValid Corporate
                    </span>
                    <Table
                      column={InValidColumn}
                      rows={invalidCorporates}
                      pagination={false}
                      // scroll={{ y: 200 }}
                      className="Counter-Party-Modal-table"
                    />
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <Button
                  text="Save"
                  onClick={onSaveHit}
                  className="Counter-Party-Add-btn"
                  icon={<i class="icon-upload-cloud Counter-Party"></i>}
                />
                <Button
                  text="Discard"
                  onClick={closeUploadCounterPartyModal}
                  className="Counter-Party-Cancel-btn"
                  icon={<i class="icon-close Counter-Party"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />

      {uploadReducer.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default CounterPartyModal;
