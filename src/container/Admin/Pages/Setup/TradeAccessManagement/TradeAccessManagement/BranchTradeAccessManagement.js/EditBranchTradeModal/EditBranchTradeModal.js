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
import { setBranchTradeRightsUpdated } from "../../../../../../../../store/actions/RealtimeActions";
const EditBranchTradeModal = ({ info }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const branchTradeRightsUpdated = useSelector(
    (state) => state.RealtimeActionReducer.branchTradeRightsUpdated
  );
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
    maxTransactionLimit: {
      value: 0,
      rawValue: 0,
      errorMessage: "",
      errorStatus: false,
    },
    minTransactionLimit: {
      value: 0,
      rawValue: 0,
      errorMessage: "",
      errorStatus: false,
    },
    totalLimit: {
      value: 0,
      rawValue: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

  //Instrument Table Data
  const [instrumentDataSource, setInstrumentDataSource] = useState([]);
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
                isForwardBuy: false,
                isForwardSell: false,
                isParityBuy: false,
                isParitySell: false,
                isActive: false,
                isViewOnly: true,
              };
            }
          );

          setInstrumentDataSource(newDataMapping);

          setTradeRightsData({
            ...tradeRightsData,
            maxTransactionLimit: {
              ...tradeRightsData.maxTransactionLimit,
              rawValue: GetBranchTradeRights.maxTransactionLimit,
              value: Number(
                GetBranchTradeRights.maxTransactionLimit
              ).toLocaleString("en-PK"),
            },
            minTransactionLimit: {
              ...tradeRightsData.minTransactionLimit,
              rawValue: GetBranchTradeRights.minTransactionLimit,
              value: Number(
                GetBranchTradeRights.minTransactionLimit
              ).toLocaleString("en-PK"),
            },
            totalLimit: {
              ...tradeRightsData.totalLimit,
              rawValue: GetBranchTradeRights.totalLimit,
              value: Number(GetBranchTradeRights.totalLimit).toLocaleString(
                "en-PK"
              ),
            },
          });
        }
      } catch (error) {
        console.error("Error in mapping instrument data:", error);
      }
    }
  }, [GetBranchTradeRights, GetAllInstruments]);

  useEffect(() => {
    if (branchTradeRightsUpdated !== null) {
      try {
        const { branchTradeRights } = branchTradeRightsUpdated;
        if (info.id === branchTradeRights.branchID) {
          // Update the limits
          setTradeRightsData((prev) => ({
            ...prev,
            maxTransactionLimit: {
              ...prev.maxTransactionLimit,
              rawValue: branchTradeRights.maxTransactionLimit,
              value: Number(
                branchTradeRights.maxTransactionLimit
              ).toLocaleString("en-PK"),
            },
            minTransactionLimit: {
              ...prev.minTransactionLimit,
              rawValue: branchTradeRights.minTransactionLimit,
              value: Number(
                branchTradeRights.minTransactionLimit
              ).toLocaleString("en-PK"),
            },
            totalLimit: {
              ...prev.totalLimit,
              rawValue: branchTradeRights.totalLimitF,
              value: Number(branchTradeRights.totalLimitF).toLocaleString(
                "en-PK"
              ),
            },
          }));

          // Update the instrument checkboxes
          setInstrumentDataSource((prevData) => {
            return prevData.map((instrument) => {
              const updatedInstrument =
                branchTradeRights.listOfInstruments.find(
                  (item) => item.instrumentID === instrument.instrumentID
                );

              if (updatedInstrument) {
                return {
                  ...instrument,
                  isCrossRateBuy: updatedInstrument.isCrossRateBuy,
                  isCrossRateSell: updatedInstrument.isCrossRateSell,
                  isDiscounting: updatedInstrument.isDiscounting,
                  isForwardBuy: updatedInstrument.isForwardBuy,
                  isForwardSell: updatedInstrument.isForwardSell,
                  isParityBuy: updatedInstrument.isParityBuy,
                  isParitySell: updatedInstrument.isParitySell,
                  isActive: updatedInstrument.isActive,
                  isViewOnly: updatedInstrument.isViewOnly,
                };
              }
              return instrument;
            });
          });
        }
        dispatch(setBranchTradeRightsUpdated(null));
      } catch (error) {
        console.error("Error updating from MQTT:", error);
      }
    }
  }, [branchTradeRightsUpdated]);

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
                isForwardBuy: event && false,
                isForwardSell: event && false,
                isParityBuy: event && false,
                isParitySell: event && false,
                isActive: event ? false : true,
                isViewOnly: false,
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
                isForwardBuy: !event && false,
                isForwardSell: !event && false,
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
          title: "Instrument",
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
              disabled={record.isActive ? false : true}
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
              disabled={record.isActive ? false : true}
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
              disabled={record.isActive ? false : true}
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
              disabled={record.isActive ? false : true}
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
      title: "Forward",
      key: "Forward",
      children: [
        {
          title: "Buy",
          dataIndex: "isForwardBuy",
          key: "isForwardBuy",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.isForwardBuy}
              disabled={record.isActive ? false : true}
              onChange={(event) =>
                handleCheckboxChange(
                  record,
                  "isForwardBuy",
                  event.target.checked
                )
              }
            />
          ),
        },
        {
          title: "Sell",
          dataIndex: "isForwardSell",
          key: "isForwardSell",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.isForwardSell}
              disabled={record.isActive ? false : true}
              onChange={(event) =>
                handleCheckboxChange(
                  record,
                  "isForwardSell",
                  event.target.checked
                )
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
              disabled={record.isActive ? false : true}
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
    // {
    //   title: "",
    //   children: [
    //     {
    //       title: "Hide",
    //       dataIndex: "isViewOnly",
    //       key: "isViewOnly",
    //       align: "center",
    //       render: (_, record) => (
    //         <CustomSwitch
    //           checked={record.isViewOnly}
    //           onChange={(event) =>
    //             handleCheckboxChange(record, "isViewOnly", event)
    //           }
    //         />
    //       ),
    //     },
    //   ],
    //   key: "",
    //   dataIndex: "",
    //   align: "center",
    // },
  ];

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    let rawValue = value.replace(/[^0-9]/g, ""); // Remove non-digits
    rawValue = rawValue.replace(/^0+(?=\d)/, ""); // Remove leading zeros

    const formattedValue = rawValue
      ? Number(rawValue).toLocaleString("en-PK")
      : "";
    const hasError = rawValue.trim() === "";

    setTradeRightsData((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: {
          value: formattedValue,
          rawValue,
          errorMessage: hasError ? "This field is required" : "",
          errorStatus: hasError,
        },
      };

      const totalLimit = Number(updatedState.totalLimit?.rawValue || 0);
      const minLimit = Number(updatedState.minTransactionLimit?.rawValue || 0);
      const maxLimit = Number(updatedState.maxTransactionLimit?.rawValue || 0);

      // Validation logic
      const limitError = minLimit > maxLimit;
      const totalLimitMaxError = totalLimit < maxLimit;
      const totalLimitMinError = totalLimit < minLimit;

      const minErrors = [];
      const maxErrors = [];

      if (limitError) {
        minErrors.push("Min limit cannot be greater than Max limit");
        maxErrors.push("Max limit cannot be less than Min limit");
      }
      if (totalLimitMinError) {
        minErrors.push("Min limit cannot be greater than Total Limit");
      }
      if (totalLimitMaxError) {
        maxErrors.push("Max limit cannot be greater than Total Limit");
      }

      return {
        ...updatedState,
        minTransactionLimit: {
          ...updatedState.minTransactionLimit,
          errorMessage: minErrors.join(" | "),
          errorStatus: minErrors.length > 0,
        },
        maxTransactionLimit: {
          ...updatedState.maxTransactionLimit,
          errorMessage: maxErrors.join(" | "),
          errorStatus: maxErrors.length > 0,
        },
      };
    });
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
        TotalLimit: Number(tradeRightsData.totalLimit.rawValue),
        MinTransactionLimit: Number(
          tradeRightsData.minTransactionLimit.rawValue
        ),
        MaxTransactionLimit: Number(
          tradeRightsData.maxTransactionLimit.rawValue
        ),
        ListOfInstruments: instrumentDataSource.map((item) => ({
          InstrumentID: item.instrumentID,
          IsCrossRateBuy: item.isCrossRateBuy,
          IsCrossRateSell: item.isCrossRateSell,
          IsDiscounting: item.isDiscounting,
          IsForwardBuy: item.isForwardBuy,
          IsForwardSell: item.isForwardSell,
          IsParityBuy: item.isParityBuy,
          IsParitySell: item.isParitySell,
          IsActive: item.isActive,
          IsViewOnly: false,
        })),
      };

      dispatch(UpdateBranchTradeRightsAPI(navigate, updatedData, closeModal));
    }
    // else if (modalState === 2) {
    // }
    setModalState(0);
    handleNoButton();
  };

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
            <Col lg={9} md={9} sm={12} className="mx-auto">
              <Row>
                <Col lg={6} md={6} sm={12}>
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
                <Col lg={6} md={6} sm={12}>
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
              <Row className="mt-1">
                <Col lg={6} md={6} sm={6}>
                  <TextField
                    name={"minTransactionLimit"}
                    labelClass="d-none"
                    placeholder={"Min Amount Limit"}
                    value={
                      tradeRightsData.minTransactionLimit.value !== 0
                        ? tradeRightsData.minTransactionLimit.value
                        : ""
                    }
                    onChange={handleValueChange}
                    maxLength={10}
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <Row>
                    <TextField
                      name={"maxTransactionLimit"}
                      labelClass="d-none"
                      placeholder={"Max Amount Limit"}
                      value={
                        tradeRightsData.maxTransactionLimit.value !== 0
                          ? tradeRightsData.maxTransactionLimit.value
                          : ""
                      }
                      onChange={handleValueChange}
                      maxLength={10}
                    />
                  </Row>
                  {tradeRightsData.maxTransactionLimit.errorStatus && (
                    <Row>
                      <Col className="d-flex justify-content-start">
                        <p className={styles["branchErrorMessage"]}>
                          {tradeRightsData.maxTransactionLimit.errorMessage}
                        </p>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              <Table
                column={columns}
                pagination={false}
                rows={filterRows}
                scroll={{ y: 200 }}
                className={"TradeAccessManagementEdit"}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row className="mt-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                icon={<i className="icon-refresh"></i>}
                text={"Save Changes"}
                className={styles["SaveBranchChangeBtn"]}
                iconClass={styles["IconClass"]}
                onClick={handleSaveChangesButton}
                disableBtn={
                  tradeRightsData.maxTransactionLimit.errorStatus ||
                  tradeRightsData.minTransactionLimit.errorStatus ||
                  tradeRightsData.totalLimit.errorStatus
                    ? true
                    : false
                }
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
