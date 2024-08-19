import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import "./CategoryManagement.css";
const DeleteModal = ({
  deleteRejectModal,
  setDeleteRejectModal,
  delteCateogry,
}) => {
  console.log("delteCateogrydelteCateogry", delteCateogry);
  // for close modal handler
  const closeRejectionReasonModal = () => {
    setDeleteRejectModal(false);
  };

  return (
    <Fragment>
      <Modal
        show={deleteRejectModal}
        setShow={setDeleteRejectModal}
        modalHeaderClassName={"d-none"}
        size="lg"
        onHide={closeRejectionReasonModal}
        ModalBody={
          <>
            <Row className="mt-2">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <span className="HeadingModal">
                  Corporates Associated With Category
                </span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Row>
                  <Col lg={12} md={12} sm={12} className="ModalScroller">
                    {delteCateogry !== undefined && delteCateogry !== null ? (
                      <>
                        {/* <p>{delteCateogry?.categoryName}</p>
                    <p>{delteCateogry?.bidSpread}</p>
                    <p>{delteCateogry?.categoryID}</p>
                    <p>{delteCateogry?.offerSpread}</p> */}
                        {delteCateogry?.corporates.length > 0
                          ? delteCateogry?.corporates.map((data, index) => {
                              return (
                                <p>
                                  {
                                    <ul>
                                      <li>{data.corporateName}</li>
                                    </ul>
                                  }
                                </p>
                              );
                            })
                          : ""}

                        {/* <p>{delteCateogry?.categoryName}</p> */}
                      </>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        }
        ModalFooter={<></>}
      />
    </Fragment>
  );
};

export default DeleteModal;
