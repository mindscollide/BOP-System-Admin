import { useEffect, useState } from "react";
import CustomModal from "../../../../../../components/elements/modal/Modal";
import styles from "./viewHolidays.module.css";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getListAllInstrumentsApi } from "../../../../../../store/actions/Auth-Actions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomButton from "../../../../../../components/elements/button/Button";
import CustomTable from "../../../../../../components/elements/table/Table";

const ViewHolidays = ({ viewHolidayModal, setViewHolidayModal }) => {
  const dispatch = useDispatch();
  const getHolidayByHolidayId = useSelector(
    (state) => state.auth.getHolidayByHolidayId
  );
  const [viewHolidays, setViewHolidays] = useState({
    holidayDate: "",
    currency: [],
    holidayId: 0,
  });

  console.log(viewHolidays, "viewHolidaysviewHolidays");
  const listOfAllInstruments = useSelector(
    (state) => state.auth.getListAllInstruments
  );

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getListAllInstrumentsApi(navigate));
  }, []);

  useEffect(() => {
    if (!getHolidayByHolidayId && !listOfAllInstruments) return;
    try {
      const { holidayDate, currencyIds, pK_HolidayId } =
        getHolidayByHolidayId.holiday;
      const { instruments } = listOfAllInstruments;
      if (instruments.length > 0) {
        let updateData = instruments
          .filter((data) => currencyIds.includes(Number(data.currencyId)))
          .map((data) => ({
            ...data,
            value: data.currencyId,
            label: data.displayCode,
          }));

        setViewHolidays({
          holidayDate: moment(holidayDate).toDate(),
          currency: updateData,
          holidayId: pK_HolidayId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [getHolidayByHolidayId, listOfAllInstruments]);

  const HolidaysColumn = [
    {
      title: "Curreny",
      dataIndex: "Curreny",
      key: "Curreny",
      render: (text, record) => {
        return <span>{record.label}</span>;
      },
    },
  ];
  return (
    <CustomModal
      ModalTitle={<span className={styles.AddHolidaysHeading}>Currencies</span>}
      modalHeaderClassName={"border-0"}
      modalFooterClassName={"border-0 d-block"}
      modalBodyClassName={"border-0"}
      size={"md"}
      show={viewHolidayModal}
      onHide={() => setViewHolidayModal(false)}
      ModalBody={
        <>
          <Row className="mb-2">
            <Col sm={12} md={12} lg={12} xl={12}>
              <div className="bg-white p-3">
                <CustomTable
                  column={HolidaysColumn}
                  rows={viewHolidays.currency}
                  className={"HolidaysManagement-table"}
                  pagination={false}
                  scroll={{y: 250}}
                />
              </div>
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              className="d-flex justify-content-center"
            >
              <CustomButton
                className={styles.AddHoliday_btn}
                text={"Back to list"}
                i_conClass={"icon-back"}
                onClick={() => setViewHolidayModal(false)}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default ViewHolidays;
