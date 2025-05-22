import React, { useEffect, useState } from "react";
import styles from "./EditModalTradeAccessManagement.module.css";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useSelector } from "react-redux";
import {
  ConfirmationModalSystemAdmin,
  editTradeAccessManagementModalSystemAdmin,
} from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { Col, Row } from "react-bootstrap";
import {
  Button,
  Checkbox,
  CustomSwitch,
  Modal,
  Table,
  TextField,
} from "../../../../../../components/elements";
import { updateCorporateDataSchema } from "../../../../../../utils/schemas";
// import DeleteConfirmationModal from "../../CorporateUserList/DeleteConfirmationModal/DeleteConfirmationModal";
import ActivateConfirmationModal from "../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { useNavigate } from "react-router-dom";
import { GetAllInstrumentsAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
const EditModalTradeAccessManagement = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  const GetBranchTradeRights = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetBranchTradeRights
  );

  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );
  console.log("GetAllInstruments", GetAllInstruments);

  console.log("Received Branch ID is: ", id);

  console.log("GetBranchTradeRights", GetBranchTradeRights);

  const [updateCorporateData, setUpdateCorporateData] = useState({
    ...updateCorporateDataSchema,
  });

  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [InstrumentID, setInstrumentID] = useState({
    value: 0,
    label: "",
  });

  //state for error Message
  const [errorShow, setErrorShow] = useState(false);
  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //save changes modal
  const [saveChanges, setSaveChanges] = useState(false);

  //disable and enable Save changes button
  const [enableButton, setEnableButton] = useState(false);

  //handle No Button
  const handleNoButton = () => {
    dispatch(editTradeAccessManagementModalSystemAdmin(false));
  };

  //Trade Rights Data
  const [tradeRightsData, setTradeRightsData] = useState({
    listOfInstruments: [],
    maxTransactionLimit: 0,
    minTransactionLimit: 0,
    totalLimit: 0,
  });

  //Instrument Table Data
  const [instrumentDataSource, setInstrumentDataSource] = useState([]);
  console.log(instrumentDataSource, "instrumentDataSource");

  useEffect(() => {
    if (GetBranchTradeRights !== null) {
      try {
        if (
          GetBranchTradeRights.listOfInstruments !== null &&
          GetBranchTradeRights.listOfInstruments !== undefined &&
          GetBranchTradeRights.listOfInstruments.length > 0
        ) {
          if (
            GetAllInstruments !== null &&
            GetAllInstruments.instruments.length > 0
          ) {
            const newDataMaping = GetBranchTradeRights.listOfInstruments.map(
              (rowTableData, index) => {
                let findInstrumentName = GetAllInstruments.instruments.find(
                  (instrumentName, index) =>
                    instrumentName.instrumentID === rowTableData.instrumentID
                );
                if (findInstrumentName !== undefined) {
                  return {
                    ...rowTableData,
                    instrumentName: findInstrumentName.instrumentName,
                  };
                }
                return rowTableData;
              }
            );

            setInstrumentDataSource(newDataMaping);
            setTradeRightsData({
              maxTransactionLimit: GetBranchTradeRights.maxTransactionLimit,
              minTransactionLimit: GetBranchTradeRights.minTransactionLimit,
              totalLimit: GetBranchTradeRights.totalLimit,
            });
          }
        }
      } catch (error) {}
    }
  }, [GetBranchTradeRights, GetAllInstruments]);
  //checkbox value change method
  const handleCheckboxChange = (record, field, event) => {
    console.log(event, "checkedcheckedchecked");
    try {
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
    } catch (error) {}
  };

  //table columns for corporate
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

    const validateInput = {
      TotalLimit: (val) => val.replace(/[^0-9]/g, "").trimStart(),
      DefaultMinAmountLimit: (val) => val.replace(/[^0-9]/g, "").trimStart(),
      DefaultMaxAmountLimit: (val) => val.replace(/[^0-9]/g, "").trimStart(),
    };
    const isFieldEmpty = (val) => val === "";
    // Update field function
    const updateField = (fieldName, fieldValue) => {
      const validValue = validateInput[fieldName]
        ? validateInput[fieldName](fieldValue)
        : fieldValue;

      const hasError = isFieldEmpty(validValue);

      setUpdateCorporateData((prevState) => ({
        ...prevState,
        [fieldName]: {
          value: validValue,
          errorMessage: hasError ? "This field is required" : "",
          errorStatus: hasError,
        },
      }));
    };

    // Update the specific field
    updateField(name, value);
  };

  //Save Button
  const handleSaveChangesButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  const handleSaveChangesButtonYes = () => {
    if (
      updateCorporateData.TotalLimit.value !== "" &&
      updateCorporateData.InstrumentType.value !== "" &&
      updateCorporateData.DefaultMinAmountLimit.value !== "" &&
      updateCorporateData.DefaultMaxAmountLimit.value !== ""
    ) {
      if (
        parseInt(updateCorporateData.DefaultMinAmountLimit.value) <=
        parseInt(updateCorporateData.DefaultMaxAmountLimit.value)
      ) {
        setSaveChanges(true);
        setErrorShow(false);
        let newData = {
          corporateData: {
            TotalLimit: updateCorporateData.TotalLimit.value,
            InstrumentType: updateCorporateData.InstrumentType.value,
            DefaultMinAmountLimit:
              updateCorporateData.DefaultMinAmountLimit.value,
            DefaultMaxAmountLimit:
              updateCorporateData.DefaultMaxAmountLimit.value,
          },
          //including data of checkbox and radio button here
          tradeAccessData: instrumentDataSource,
        };
        console.log("newData", newData);
        // dispatch(UpdateCorporateUsersAPI(navigate, newData));
        setOpen({
          open: true,
          message: "Hello Update Corporate User dispatched",
        });
      } else {
        console.log(
          "Default Min Amount Limit should be less than Default Max Amount Limit"
        );
        setErrorShow(true);
        setOpen({
          open: true,
          message:
            "Default Min Amount Limit should be less than Default Max Amount Limit",
        });
      }
    } else {
      console.log("Please fill all the Required Fields");
      setErrorShow(true);
      setOpen({
        open: true,
        message: "Please fill all the Required Fields",
      });
      return;
    }
  };
  // // show error message When user hit activate btn
  // const handleSaveChangesButton = () => {
  //   if (
  //     updateCorporateData.TotalLimit.value !== "" &&
  //     updateCorporateData.InstrumentType.value !== "" &&
  //     updateCorporateData.DefaultMinAmountLimit.value !== "" &&
  //     updateCorporateData.DefaultMaxAmountLimit.value !== ""
  //   ) {
  //     if (
  //       parseInt(updateCorporateData.DefaultMinAmountLimit.value) <=
  //       parseInt(updateCorporateData.DefaultMaxAmountLimit.value)
  //     ) {
  //       setSaveChanges(true);
  //       setErrorShow(false);
  //       let newData = {
  //         corporateData: {
  //           TotalLimit: updateCorporateData.TotalLimit.value,
  //           InstrumentType: updateCorporateData.InstrumentType.value,
  //           DefaultMinAmountLimit:
  //             updateCorporateData.DefaultMinAmountLimit.value,
  //           DefaultMaxAmountLimit:
  //             updateCorporateData.DefaultMaxAmountLimit.value,
  //         },
  //       };
  //       console.log("newData", newData);
  //       // dispatch(UpdateCorporateUsersAPI(navigate, newData));
  //       setOpen({
  //         open: true,
  //         message: "Hello Update Corporate User dispatched",
  //       });
  //     } else {
  //       setErrorShow(true);
  //       console.log(
  //         "Default Min Amount Limit should be less than or equal to Default Max Amount Limit"
  //       );
  //       setOpen({
  //         open: true,
  //         message:
  //           "Default Min Amount Limit should be less than or equal to Default Max Amount Limit",
  //       });
  //     }
  //   } else {
  //     // setTimeout();
  //     setErrorShow(true);
  //     console.log(
  //       "Default Min Amount Limit should be less than or equal to Default Max Amount Limit"
  //     );
  //     setOpen({
  //       open: true,
  //       message: "Fill All Required Fields",
  //     });
  //     setErrorShow(true);
  //   }
  // };

  useEffect(() => {
    dispatch(GetAllInstrumentsAPI(navigate));
  }, []);

  useEffect(() => {
    if (GetAllInstruments !== null) {
      console.log("GetAllInstruments is: ", GetAllInstruments);
      try {
        let newInstrumentsData = GetAllInstruments.instruments.map(
          (instrument) => {
            return {
              ...instrument,
              value: { value: instrument.instrumentID },
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
    setInstrumentID(selectedInstrument);

    setUpdateCorporateData((prevState) => ({
      ...prevState,
      instrumentType: {
        ...prevState.instrumentID,
        value: selectedInstrument.value,
      },
    }));
  };

  // useEffect(() => {
  //   console.log("writing in useEffect");
  //   const {
  //     InstrumentType,
  //     TotalLimit,
  //     DefaultMinAmountLimit,
  //     DefaultMaxAmountLimit,
  //   } = updateCorporateData;

  //   // Check if any field is empty
  //   const isAnyFieldEmpty =
  //     !InstrumentType.value ||
  //     !TotalLimit.value ||
  //     !DefaultMinAmountLimit.value ||
  //     !DefaultMaxAmountLimit.value;

  //   // Check if min limit is greater than max limit
  //   const isMinGreaterThanMax =
  //     parseInt(DefaultMinAmountLimit.value) >
  //     parseInt(DefaultMaxAmountLimit.value);

  //   // Disable button if any field is empty OR min > max
  //   if (isAnyFieldEmpty || isMinGreaterThanMax) {
  //     setEnableButton(false);
  //   } else {
  //     setEnableButton(true);
  //   }
  // }, [updateCorporateData.InstrumentType.value, updateCorporateData]);

  // const data source
  return (
    <Modal
      show={BOPSystemAdminModal.editModalTradeAccessManagement}
      setShow={(value) =>
        dispatch(editTradeAccessManagementModalSystemAdmin(value))
      }
      className="UniversalBOPModalStylesTradeAccessManagment"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooterTradeAccessMangement"
      size="xl"
      onHide={() => dispatch(editTradeAccessManagementModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className={styles["HeaderNameLabel"]}>
                Gulahmed (Trade Access Management)
              </span>
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
                    name={"TotalLimit"}
                    labelClass="d-none"
                    placeholder={"Total Limit"}
                    value={
                      tradeRightsData.totalLimit
                        ? tradeRightsData.totalLimit
                        : ""
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
                    value={InstrumentID.value !== 0 ? InstrumentID : null}
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
                    name={"DefaultMinAmountLimit"}
                    labelClass="d-none"
                    placeholder={"Min Amount Limit"}
                    value={tradeRightsData.minTransactionLimit}
                    onChange={handleValueChange}
                    maxLength={10}
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <TextField
                    name={"DefaultMaxAmountLimit"}
                    labelClass="d-none"
                    placeholder={"Max Amount Limit"}
                    value={tradeRightsData.maxTransactionLimit}
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
                rows={instrumentDataSource}
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
                onClick={handleNoButton}
              />
            </Col>
          </Row>
          {/* {saveChanges && <DeleteConfirmationModal />} */}
          {<ActivateConfirmationModal onConfirm={handleSaveChangesButtonYes} />}
        </>
      }
    />
  );
};

export default EditModalTradeAccessManagement;
