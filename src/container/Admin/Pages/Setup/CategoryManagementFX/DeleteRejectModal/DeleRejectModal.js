import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Modal } from "../../../../../../components/elements";
import styles from "./DeleteRejectModal.module.css";
import { useSelector } from "react-redux";
import { DeleteCategoryModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import { DeleteCorporateCategoryAPI } from "../../../../../../store/actions/Auth-Actions";
import { useNavigate } from "react-router-dom";
const DeleteModal = ({ categoryID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  const handleDeleteModalOKButtonEvent = () => {
    let data = {
      CategoryId: Number(categoryID),
    };
    dispatch(DeleteCorporateCategoryAPI(navigate, data));
  };

  return (
    <Fragment>
      <Modal
        show={BOPSystemAdminModal.deleteCategoryModal}
        setShow={(value) => dispatch(DeleteCategoryModalSystemAdmin(value))}
        className="UniversalBOPModalStylesAddCategory"
        modalHeaderClassName={"d-none"}
        modalFooterClassName="UniversalBOPModalStylesfooter"
        size="md"
        onHide={() => dispatch(DeleteCategoryModalSystemAdmin(false))}
        ModalBody={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <span className={styles["HeadingModal"]}>Delete Category</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className={styles["Description"]}
                  >
                    Some counter party are assigned to this category, kindly
                    clear the category first
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        }
        ModalFooter={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center align-items-center"
              >
                <Button
                  text={"OK"}
                  onClick={handleDeleteModalOKButtonEvent}
                  className={"OkayButttonDeleteCategoryModal"}
                />
              </Col>
            </Row>
          </>
        }
      />
    </Fragment>
  );
};

export default DeleteModal;
