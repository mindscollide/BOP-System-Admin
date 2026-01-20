import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./HolidaysManagement.module.css";
import CustomButton from "../../../../../components/elements/button/Button";
import CustomTable from "../../../../../components/elements/table/Table";
import AddHolidays from "./addEditDeleteHolidays";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getHolidayByHolidayId_API,
  getHolidayList_API,
  setHolidayAdded,
  setHolidayDeleted,
  setHolidayUpdated,
} from "../../../../../store/actions/Auth-Actions";
import ViewHolidays from "./holidaysView";
import moment from "moment";
import {
  useAntTableScrollBottomVirtual,
  useTableScrollBottom,
} from "../../../../../helpers/useTableScrollBottom";

const HolidaysManagement = () => {
  const [addEditDeleteHolidayModal, setAddEditDeleteHolidayModal] =
    useState(false);
  const [viewHolidayModal, setViewHolidayModal] = useState(false);
  const [addEditViewState, setAddEditViewState] = useState(1);
  const [rows, setRows] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllHolidays = useSelector((state) => state.auth.getAllHolidays);
  const holidayAdded = useSelector((state) => state.auth.holidayAdded);
  const holidayUpdated = useSelector((state) => state.auth.holidayUpdated);
  const holidayDeleted = useSelector((state) => state.auth.holidayDeleted);

  useEffect(() => {
    let Data = { sRow: 0, Length: 10 };

    dispatch(getHolidayList_API(navigate, Data));
  }, []);

  useAntTableScrollBottomVirtual(() => {
    console.log("🚀 Table reached bottom");

    if (totalRecords !== rows.length) {
      const Data = {
        sRow: rows.length,
        Length: 10,
      };

      dispatch(getHolidayList_API(navigate, Data));
    }
  }, 10);

  useEffect(() => {
    if (!getAllHolidays?.holidays) {
      setRows([]);
      setTotalRecords(0);
      return;
    }

    try {
      const newRows = getAllHolidays.holidays;

      if (newRows.length > 0) {
        setRows((prev) => {
          // 🔒 Prevent duplicate rows (VERY IMPORTANT)
          const existingIds = new Set(prev.map((r) => r.pK_HolidayId));
          const filtered = newRows.filter(
            (r) => !existingIds.has(r.pK_HolidayId)
          );

          return [...prev, ...filtered];
        });

        setTotalRecords(getAllHolidays.totalRecords);
      }
    } catch (error) {
      console.error(error);
    }
  }, [getAllHolidays]);

  useEffect(() => {
    if (holidayAdded !== null && holidayAdded !== undefined) {
      try {
        console.log(holidayAdded, "holidayAdded");
        // if (Array.isArray(holidayAdded.holidays)) {
        setRows((prev) => [...prev, holidayAdded.holidays]);
        setTotalRecords((prev) => prev + 1);
        dispatch(setHolidayAdded(null));
        // }
      } catch (error) {
        console.log(error);
      }
    }
  }, [holidayAdded]);

  useEffect(() => {
    if (holidayUpdated !== null && holidayUpdated !== undefined) {
      try {
        setRows((prev) => {
          return prev.map((data2, index) => {
            if (data2.pK_HolidayId === holidayUpdated.holidays.pK_HolidayId) {
              return holidayUpdated.holidays;
            }
            return data2;
          });
        });
        dispatch(setHolidayUpdated(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [holidayUpdated]);

  useEffect(() => {
    if (holidayDeleted !== null && holidayDeleted !== undefined) {
      try {
        setRows((prev) => {
          return prev.filter((data2, index) => {
            return data2.pK_HolidayId !== holidayDeleted.holidayId;
          });
        });
        setTotalRecords((prev) => prev - 1);
        dispatch(setHolidayDeleted(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [holidayDeleted]);

  useEffect(() => {
    // If backend has more data but UI has less
    if (rows.length < totalRecords) {
      // 🔥 Fetch exactly the missing amount
      dispatch(
        getHolidayList_API(navigate, {
          sRow: rows.length,
          Length: 10,
        })
      );
    }
  }, [rows.length, totalRecords]);

  const handleAddEditDelete = (record, viewState) => {
    if (viewState === 1) {
      setAddEditViewState(viewState);
      setAddEditDeleteHolidayModal(true);
      return;
    }
    let Data = { holidayID: record.pK_HolidayId };
    dispatch(
      getHolidayByHolidayId_API(
        navigate,
        Data,
        setAddEditViewState,
        viewState,
        setAddEditDeleteHolidayModal
      )
    );
  };

  const handleView = (record) => {
    let Data = { holidayID: record.pK_HolidayId };
    dispatch(
      getHolidayByHolidayId_API(
        navigate,
        Data,
        setAddEditViewState,
        3,
        setViewHolidayModal
      )
    );
  };

  const HolidaysColumn = [
    {
      title: "Date",
      dataIndex: "holidayDate",
      key: "holidayDate",
      render: (text) => {
        return <span>{moment(text).format("DD-MM-YYYY")}</span>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "View Currencies",
      dataIndex: "holidayType",
      key: "holidayType",
      align: "center",
      render: (text, record) => {
        return (
          <span>
            <CustomButton
              i_conClass="icon-eye"
              onClick={() => handleView(record)}
              className={styles.view_btn}
            />
          </span>
        );
      },
    },
    {
      title: "",
      dataIndex: "holidayId",
      key: "holidayId",
      align: "center",
      render: (text, record) => {
        return (
          <span>
            <CustomButton
              i_conClass="icon-edit"
              className={styles.view_edit}
              onClick={() => handleAddEditDelete(record, 2)}
            />
            <CustomButton
              i_conClass="icon-trash"
              className={styles.view_delete}
              onClick={() => handleAddEditDelete(record, 3)}
            />
          </span>
        );
      },
    },
  ];
  return (
    <div className="py-2 px-3">
      <Row>
        <Col
          xs={6}
          md={6}
          lg={6}
          xl={6}
          className="d-flex justify-content-start align-items-center"
        >
          <span className={styles.holidays}>Holidays</span>
        </Col>
        <Col
          xs={6}
          md={6}
          lg={6}
          xl={6}
          className="d-flex justify-content-end align-items-center"
        >
          <CustomButton
            i_conClass="icon-add"
            className={styles.AddHoliday_btn}
            text={"Add Holiday"}
            onClick={() => handleAddEditDelete(null, 1)}
          />
        </Col>
        <Col sm={12} md={12} lg={12} xl={12} className="mt-3">
          <div className="bg-white p-3">
            <CustomTable
              column={HolidaysColumn}
              rows={rows}
              className={"HolidaysManagement-table"}
              pagination={false}
              scroll={{ y: 520 }}
            />
          </div>
        </Col>
      </Row>
      {addEditDeleteHolidayModal && (
        <AddHolidays
          addEditDeleteHolidayModal={addEditDeleteHolidayModal}
          setAddEditDeleteHolidayModal={setAddEditDeleteHolidayModal}
          setAddEditViewState={setAddEditViewState}
          addEditViewState={addEditViewState}
        />
      )}
      {viewHolidayModal && (
        <ViewHolidays
          viewHolidayModal={viewHolidayModal}
          setViewHolidayModal={setViewHolidayModal}
        />
      )}
    </div>
  );
};

export default HolidaysManagement;
