import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./EditBranchTradeModal.module.css";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useSelector } from "react-redux";
import {
  ConfirmationModalSystemAdmin,
  editTradeAccessManagementModalSystemAdmin,
} from "../../../../../../../../store/actions/BOPSystemAdminModalsActions";
import { Col, Row } from "react-bootstrap";
import {
  Button,
  Checkbox,
  CustomSwitch,
  Modal,
  Table,
  TextField,
} from "../../../../../../../../components/elements";
import ActivateConfirmationModal from "../../../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { useNavigate } from "react-router-dom";
import { GetAllInstrumentsAPI } from "../../../../../../../../store/actions/BOPSystemAdminActions";
import { UpdateBranchTradeRightsAPI } from "../../../../../../../../store/actions/SetupTradeAccessManagementActions";
const EditBranchTradeModal = ({ info }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  const GetBranchTradeRights = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetBranchTradeRights
  );
  const showActivationModal = useSelector(
    (state) => state.BOPSystemAdminModal.confirmationModal
  );
  const [selectedInstrument, setSelectInstruments] = useState([]);
  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );

  const [modalState, setModalState] = useState(0);
  const [instrumentOptions, setInstrumentOptions] = useState([]);

  //handle No Button
  const handleNoButton = () => {
    dispatch(editTradeAccessManagementModalSystemAdmin(false));
    dispatch(ConfirmationModalSystemAdmin(false));
  };

  //Trade Rights Data
  const [tradeRightsData, setTradeRightsData] = useState({
    listOfInstruments: [],
    maxTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
    minTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
    totalLimit: { value: 0, errorMessage: "", errorStatus: false },
  });

  //Instrument Table Data
  const [instrumentDataSource, setInstrumentDataSource] = useState([]);

  // useEffect(() => {
  //   if (GetBranchTradeRights !== null) {
  //     try {
  //       if (
  //         GetBranchTradeRights.listOfInstruments !== null &&
  //         GetBranchTradeRights.listOfInstruments !== undefined &&
  //         GetBranchTradeRights.listOfInstruments.length > 0
  //       ) {
  //         if (
  //           GetAllInstruments !== null &&
  //           GetAllInstruments.instruments.length > 0
  //         ) {
  //           const newDataMaping = GetBranchTradeRights.listOfInstruments.map(
  //             (rowTableData, index) => {
  //               let findInstrumentName = GetAllInstruments.instruments.find(
  //                 (instrumentName, index) =>
  //                   instrumentName.instrumentID === rowTableData.instrumentID
  //               );
  //               if (findInstrumentName !== undefined) {
  //                 return {
  //                   ...rowTableData,
  //                   instrumentName: findInstrumentName.instrumentName,
  //                 };
  //               }
  //               return rowTableData;
  //             }
  //           );
  //           // let listInstruments = newDataMaping.map((list, index) => {
  //           //   return {
  //           //     value: list.instrumentID,
  //           //     label: list.instrumentName,
  //           //   };
  //           // });

  //           setInstrumentDataSource(newDataMaping);
  //           setTradeRightsData({
  //             maxTransactionLimit: {
  //               value: GetBranchTradeRights.maxTransactionLimit,
  //             },
  //             minTransactionLimit: {
  //               value: GetBranchTradeRights.minTransactionLimit,
  //             },
  //             totalLimit: { value: GetBranchTradeRights.totalLimit },
  //           });
  //         }
  //       }
  //     } catch (error) {}
  //   }
  // }, [GetBranchTradeRights, GetAllInstruments]);

  useEffect(() => {
    if (GetBranchTradeRights !== null && GetAllInstruments !== null) {
      try {
        if (
          GetAllInstruments.instruments &&
          GetAllInstruments.instruments.length > 0
        ) {
          const newDataMapping = GetAllInstruments.instruments.map(
            (instrument) => {
              const matchedInstrument =
                GetBranchTradeRights.listOfInstruments?.find(
                  (item) => item.instrumentID === instrument.instrumentID
                );

              // If match found, merge the data and set instrumentName
              if (matchedInstrument) {
                return {
                  ...matchedInstrument,
                  instrumentName: instrument.instrumentName,
                };
              }

              // If no match, return default values
              return {
                instrumentID: instrument.instrumentID,
                instrumentName: instrument.instrumentName,
                isCrossRateBuy: false,
                isCrossRateSell: false,
                isDiscounting: false,
                isForward: false,
                isParityBuy: false,
                isParitySell: false,
                isActive: false,
                isViewOnly: true,
              };
            }
          );

          setInstrumentDataSource(newDataMapping);

          setTradeRightsData({
            maxTransactionLimit: {
              value: GetBranchTradeRights.maxTransactionLimit,
            },
            minTransactionLimit: {
              value: GetBranchTradeRights.minTransactionLimit,
            },
            totalLimit: { value: GetBranchTradeRights.totalLimit },
          });
        }
      } catch (error) {
        console.error("Error in mapping instrument data:", error);
      }
    }
  }, [GetBranchTradeRights, GetAllInstruments]);
  //checkbox value change method
  const handleCheckboxChange = (record, field, event) => {
    try {
      if (field === "isViewOnly") {
        setInstrumentDataSource((prevData) =>
          prevData.map((rowData) => {
            if (rowData.instrumentID === record.instrumentID) {
              return {
                ...rowData,
                isCrossRateBuy: event && false,
                isCrossRateSell: event && false,
                isDiscounting: event && false,
                isForward: event && false,
                isParityBuy: event && false,
                isParitySell: event && false,
                isActive: event ? false : true,
                isViewOnly: event,
              };
            }
            return rowData; // Moved outside the 'if' block
          })
        );
      } else if (field === "isActive") {
        setInstrumentDataSource((prevData) =>
          prevData.map((rowData) => {
            if (rowData.instrumentID === record.instrumentID) {
              return {
                ...rowData,
                isCrossRateBuy: !event && false,
                isCrossRateSell: !event && false,
                isDiscounting: !event && false,
                isForward: !event && false,
                isParityBuy: !event && false,
                isParitySell: !event && false,
                isActive: event,
                isViewOnly: event ? false : true,
              };
            }
            return rowData; // Moved outside the 'if' block
          })
        );
      } else {
        setInstrumentDataSource((prevData) =>
          prevData.map((rowData) => {
            if (rowData.instrumentID === record.instrumentID) {
              return {
                ...rowData,
                [field]: event,
              };
            }
            return rowData; // Moved outside the 'if' block
          })
        );
      }
    } catch (error) {}
  };

  //table columns for Branch
  const columns = [
    {
      title: "",
      children: [
        {
          title: "instrumentID",
          dataIndex: "instrumentName",
          key: "instrumentName",
          align: "center",
        },
      ],
      key: "",
      dataIndex: "",
      align: "center",
    },

    {
      title: "Cross Rate",
      key: "CrossRate",
      children: [
        {
          title: "Buy",
          dataIndex: "isCrossRateBuy",
          key: "isCrossRateBuy",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.isCrossRateBuy}
              disabled={record.isViewOnly ? true : false}
              onChange={(event) =>
                handleCheckboxChange(
                  record,
                  "isCrossRateBuy",
                  event.target.checked
                )
              }
            />
          ),
        },
        {
          title: "Sell",
          dataIndex: "isCrossRateSell",
          key: "isCrossRateSell",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.isCrossRateSell}
              disabled={record.isViewOnly ? true : false}
              onChange={(event) =>
                handleCheckboxChange(
                  record,
                  "isCrossRateSell",
                  event.target.checked
                )
              }
            />
          ),
        },
      ],
    },
    {
      title: "Parity",
      key: "Parity",
      children: [
        {
          title: "Buy",
          dataIndex: "isParityBuy",
          key: "isParityBuy",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.isParityBuy}
              disabled={record.isViewOnly ? true : false}
              onChange={(event) =>
                handleCheckboxChange(
                  record,
                  "isParityBuy",
                  event.target.checked
                )
              }
            />
          ),
        },
        {
          title: "Sell",
          dataIndex: "isParitySell",
          key: "isParitySell",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.isParitySell}
              disabled={record.isViewOnly ? true : false}
              onChange={(event) =>
                handleCheckboxChange(
                  record,
                  "isParitySell",
                  event.target.checked
                )
              }
            />
          ),
        },
      ],
    },
    {
      // title: "",
      // key: "",
      // dataIndex: "",
      // align: "center",
      children: [
        {
          title: "Forward",
          dataIndex: "isForward",
          key: "isForward",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.isForward}
              disabled={record.isViewOnly ? true : false}
              onChange={(event) =>
                handleCheckboxChange(record, "isForward", event.target.checked)
              }
            />
          ),
        },
      ],
    },
    {
      title: "",
      children: [
        {
          title: "Discounting",
          dataIndex: "isDiscounting",
          key: "isDiscounting",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.isDiscounting}
              disabled={record.isViewOnly ? true : false}
              onChange={(event) =>
                handleCheckboxChange(
                  record,
                  "isDiscounting",
                  event.target.checked
                )
              }
            />
          ),
        },
      ],
      // key: "",
      // dataIndex: "",
      // align: "center",
    },
    {
      title: "",
      children: [
        {
          title: "Active",
          dataIndex: "isActive",
          key: "isActive",
          align: "center",
          render: (_, record) => (
            <CustomSwitch
              size="small"
              checked={record.isActive}
              onChange={(event) =>
                handleCheckboxChange(record, "isActive", event)
              }
            />
          ),
        },
      ],
      key: "",
      dataIndex: "",
      align: "center",
    },
    {
      title: "",
      children: [
        {
          title: "Hide",
          dataIndex: "isViewOnly",
          key: "isViewOnly",
          align: "center",
          render: (_, record) => (
            <CustomSwitch
              checked={record.isViewOnly}
              onChange={(event) =>
                handleCheckboxChange(record, "isViewOnly", event)
              }
              size="small"
            />
          ),
        },
      ],
      key: "",
      dataIndex: "",
      align: "center",
    },
  ];

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    // Allow: digits, optional one dot
    const validString = value
      .replace(/[^0-9.]/g, "")
      .replace(/^([^.]*\.)|\./g, "$1");

    // No error if value is not empty and a valid number format
    const hasError = validString.trim() === "";

    setTradeRightsData((prevState) => ({
      ...prevState,
      [name]: {
        value: validString, // Keep string while typing
        errorMessage: hasError ? "This field is required" : "",
        errorStatus: hasError,
      },
    }));
  };

  // show error message When user hit activate btn
  const handleSaveChangesButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(1);
  };

  //Save Button
  const handleSaveChangesButtonYes = () => {
    if (modalState === 1) {
      dispatch(editTradeAccessManagementModalSystemAdmin(false));
      let updatedData = {
        BranchID: info.id,
        TotalLimit: Number(tradeRightsData.totalLimit.value),
        MinTransactionLimit: Number(tradeRightsData.minTransactionLimit.value),
        MaxTransactionLimit: Number(tradeRightsData.maxTransactionLimit.value),
        ListOfInstruments: instrumentDataSource.map((item) => ({
          InstrumentID: item.instrumentID,
          IsCrossRateBuy: item.isCrossRateBuy,
          IsCrossRateSell: item.isCrossRateSell,
          IsDiscounting: item.isDiscounting,
          IsForward: item.isForward,
          IsParityBuy: item.isParityBuy,
          IsParitySell: item.isParitySell,
          IsActive: item.isActive,
          IsViewOnly: item.isViewOnly,
        })),
      };

      dispatch(UpdateBranchTradeRightsAPI(navigate, updatedData));
    }
    // else if (modalState === 2) {
    // }
    setModalState(0);
    handleNoButton();
  };

  useEffect(() => {
    dispatch(GetAllInstrumentsAPI(navigate));
  }, []);

  useEffect(() => {
    if (GetAllInstruments !== null) {
      try {
        let newInstrumentsData = GetAllInstruments.instruments.map(
          (instrument) => {
            return {
              ...instrument,
              value: instrument.instrumentID,
              label: instrument.instrumentName,
            };
          }
        );
        setInstrumentOptions(newInstrumentsData);
      } catch (error) {
        return error;
      }
    }
  }, [GetAllInstruments]);

  //handle select categoryID
  const handleSelectInstrument = async (selectedInstrument) => {
    setSelectInstruments(selectedInstrument);
  };

  const filterRows = useMemo(() => {
    if (selectedInstrument.length === 0) {
      return instrumentDataSource;
    }
    return instrumentDataSource.filter((newData) =>
      selectedInstrument.some((data2) => data2.value === newData.instrumentID)
    );
  }, [selectedInstrument, instrumentDataSource]);

  const closeModal = useCallback(() => {
    setTradeRightsData({
      listOfInstruments: [],
      maxTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
      minTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
      totalLimit: { value: 0, errorMessage: "", errorStatus: false },
    });
    setInstrumentDataSource([]);
    dispatch(editTradeAccessManagementModalSystemAdmin(false));
  }, []);

  return (
    <Modal
      show={BOPSystemAdminModal.editModalTradeAccessManagement}
      setShow={closeModal}
      className="UniversalBOPModalStylesTradeAccessManagment"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooterTradeAccessMangement"
      size="xl"
      // onHide={closeModal}
      ModalBody={
        <>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <span className={styles["HeaderNameLabel"]}>{info.name}</span>
            </Col>
            <Col
              lg={6}
              md={6}
              sm={6}
              className={styles["EditBranchTrade_modal-crossIcon"]}
            >
              {" "}
              <i
                className="icon-close cursor-pointer"
                onClick={() =>
                  dispatch(editTradeAccessManagementModalSystemAdmin(false))
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg={2} md={2} sm={12}></Col>
            <Col lg={8} md={8} sm={12}>
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className={styles["labels-add-bank"]}>
                    Total Limit (PKR)
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <TextField
                    name={"totalLimit"}
                    labelClass="d-none"
                    placeholder={"Total Limit"}
                    value={
                      tradeRightsData.totalLimit
                        ? tradeRightsData.totalLimit.value
                        : 0
                    }
                    onChange={handleValueChange}
                    maxLength={10}
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <span className={styles["labels-add-bank"]}>
                    Instrument allowed
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <Select
                    isMulti
                    options={instrumentOptions}
                    placeholder={"Select Instrument"}
                    value={selectedInstrument}
                    isSearchable
                    onChange={handleSelectInstrument}
                    classNamePrefix={"selectCateogyCorporateList"}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <span className={styles["labels-add-bank"]}>
                    Default Transaction Amount Limit (Min-Max)
                  </span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={6} md={6} sm={6}>
                  <TextField
                    name={"minTransactionLimit"}
                    labelClass="d-none"
                    placeholder={"Min Amount Limit"}
                    value={
                      tradeRightsData.minTransactionLimit
                        ? tradeRightsData.minTransactionLimit.value
                        : 0
                    }
                    onChange={handleValueChange}
                    maxLength={10}
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <TextField
                    name={"maxTransactionLimit"}
                    labelClass="d-none"
                    placeholder={"Max Amount Limit"}
                    value={
                      tradeRightsData.maxTransactionLimit
                        ? tradeRightsData.maxTransactionLimit.value
                        : 0
                    }
                    onChange={handleValueChange}
                    maxLength={10}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={2} md={2} sm={12}></Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              <Table
                column={columns}
                pagination={false}
                rows={filterRows}
                scroll={{ y: 500 }}
                className={"TradeAccessManagementEdit"}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row className="mt-5">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                icon={<i className="icon-refresh"></i>}
                text={"Save Changes"}
                className={styles["AddBranchClass"]}
                iconClass={styles["IconClass"]}
                onClick={handleSaveChangesButton}
                // disableBtn={!enableButton}
              />

              <Button
                icon={<i className="icon-close"></i>}
                text={"Cancel"}
                className={styles["CancelButton"]}
                iconClass={styles["IconClass"]}
                onClick={closeModal}
              />
            </Col>
          </Row>
          {showActivationModal === true && (
            <ActivateConfirmationModal
              handleYesButton={handleSaveChangesButtonYes}
              handleNoButton={handleNoButton}
            />
          )}
        </>
      }
    />
  );
};

export default EditBranchTradeModal;
