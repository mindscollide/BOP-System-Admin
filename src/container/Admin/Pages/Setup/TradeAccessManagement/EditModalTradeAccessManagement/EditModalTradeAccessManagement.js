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
const EditModalTradeAccessManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );
  console.log("GetAllInstruments", GetAllInstruments);

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
  //Dummy Data
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      Instrument: "AUDPKR",
      BuyCrossRate: false,
      SellCrossRate: false,
      BuyParity: true,
      SellParity: false,
      Forward: false,
      Discounting: false,
      Active: true,
      Hide: false,
    },
    {
      key: "2",
      Instrument: "EURPKR",
      BuyCrossRate: true,
      SellCrossRate: true,
      BuyParity: false,
      SellParity: true,
      Forward: false,
      Discounting: true,
      Active: false,
      Hide: true,
    },
  ]);

  //checkbox value change method
  const handleCheckboxChange = (key, field) => {
    const newDataSource = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: !item[field] };
      }
      return item;
    });
    setDataSource(newDataSource);
  };

  //table columns for corporate
  const columns = [
    {
      title: "",
      children: [
        {
          title: "Instrument",
          dataIndex: "Instrument",
          key: "Instrument",
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
          dataIndex: "BuyCrossRate",
          key: "BuyCrossRate",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.BuyCrossRate}
              onChange={() => handleCheckboxChange(record.key, "BuyCrossRate")}
            />
          ),
        },
        {
          title: "Sell",
          dataIndex: "SellCrossRate",
          key: "SellCrossRate",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.SellCrossRate}
              onChange={() => handleCheckboxChange(record.key, "SellCrossRate")}
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
          dataIndex: "BuyParity",
          key: "BuyParity",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.BuyParity}
              onChange={() => handleCheckboxChange(record.key, "BuyParity")}
            />
          ),
        },
        {
          title: "Sell",
          dataIndex: "SellParity",
          key: "SellParity",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.SellParity}
              onChange={() => handleCheckboxChange(record.key, "SellParity")}
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
          dataIndex: "Forward",
          key: "Forward",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.Forward}
              onChange={() => handleCheckboxChange(record.key, "Forward")}
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
          dataIndex: "Discounting",
          key: "Discounting",
          align: "center",
          render: (_, record) => (
            <Checkbox
              checked={record.Discounting}
              onChange={() => handleCheckboxChange(record.key, "Discounting")}
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
          dataIndex: "Active",
          key: "Active",
          align: "center",
          render: (_, record) => (
            <CustomSwitch
              size="small"
              checked={record.Active}
              onChange={() => handleCheckboxChange(record.key, "Active")}
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
          dataIndex: "Hide",
          key: "Hide",
          align: "center",
          render: (_, record) => (
            <CustomSwitch
              checked={record.Hide}
              onChange={() => handleCheckboxChange(record.key, "Hide")}
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
          tradeAccessData: dataSource,
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

  useEffect(() => {
    console.log("writing in useEffect");
    const {
      InstrumentType,
      TotalLimit,
      DefaultMinAmountLimit,
      DefaultMaxAmountLimit,
    } = updateCorporateData;

    // Check if any field is empty
    const isAnyFieldEmpty =
      !InstrumentType.value ||
      !TotalLimit.value ||
      !DefaultMinAmountLimit.value ||
      !DefaultMaxAmountLimit.value;

    // Check if min limit is greater than max limit
    const isMinGreaterThanMax =
      parseInt(DefaultMinAmountLimit.value) >
      parseInt(DefaultMaxAmountLimit.value);

    // Disable button if any field is empty OR min > max
    if (isAnyFieldEmpty || isMinGreaterThanMax) {
      setEnableButton(false);
    } else {
      setEnableButton(true);
    }
  }, [updateCorporateData.InstrumentType.value, updateCorporateData]);

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
                    value={updateCorporateData.TotalLimit.value}
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
                    value={updateCorporateData.DefaultMinAmountLimit.value}
                    onChange={handleValueChange}
                    maxLength={10}
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <TextField
                    name={"DefaultMaxAmountLimit"}
                    labelClass="d-none"
                    placeholder={"Max Amount Limit"}
                    value={updateCorporateData.DefaultMaxAmountLimit.value}
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
                pagination={true}
                rows={dataSource}
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
