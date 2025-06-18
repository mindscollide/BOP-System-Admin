// import React, { useCallback, useEffect, useState } from "react";
// import styles from "./EditBranchTradeModal.module.css";
// import { useDispatch } from "react-redux";
// import Select from "react-select";
// import { useSelector } from "react-redux";
// import {
//   ConfirmationModalSystemAdmin,
//   editTradeAccessManagementModalSystemAdmin,
// } from "../../../../../../../../store/actions/BOPSystemAdminModalsActions";
// import { Col, Row } from "react-bootstrap";
// import {
//   Button,
//   Checkbox,
//   CustomSwitch,
//   Modal,
//   Table,
//   TextField,
// } from "../../../../../../../../components/elements";
// import { updateTradeAccessmanagementDataSchema } from "../../../../../../../../utils/schemas";
// // import DeleteConfirmationModal from "../../CorporateUserList/DeleteConfirmationModal/DeleteConfirmationModal";
// import ActivateConfirmationModal from "../../../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
// import { useNavigate } from "react-router-dom";
// import { GetAllInstrumentsAPI } from "../../../../../../../../store/actions/BOPSystemAdminActions";
// import { UpdateBranchTradeRightsAPI } from "../../../../../../../../store/actions/SetupTradeAccessManagementActions";
// const EditBranchTradeModal = ({ info }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { BOPSystemAdminModal } = useSelector((state) => state);
//   const GetBranchTradeRights = useSelector(
//     (state) => state.SetupTradeAccessManagementReducer.GetBranchTradeRights
//   );

//   const GetAllInstruments = useSelector(
//     (state) => state.BOPSystemAdminReducer.GetAllInstruments
//   );

//   //state for save and cancel button
//   const showActivationModal = useSelector(
//     (state) => state.BOPSystemAdminModal.confirmationModal
//   );
//   console.log("GetAllInstruments", GetAllInstruments);

//   console.log("Received Branch ID is: ", info);

//   console.log("GetBranchTradeRights", GetBranchTradeRights);

//   const [updateBranchData, setUpdateBranchData] = useState({
//     ...updateTradeAccessmanagementDataSchema,
//   });
//   const [selectedInstrument, setSelectInstruments] = useState([]);

//   const [instrumentOptions, setInstrumentOptions] = useState([]);
//   const [InstrumentID, setInstrumentID] = useState({
//     value: 0,
//     label: "",
//   });

//   const [modalState, setModalState] = useState(0);

//   //state for error Message
//   const [errorShow, setErrorShow] = useState(false);
//   //Checking snakbar state
//   const [open, setOpen] = useState(false);

//   //save changes modal
//   const [saveChanges, setSaveChanges] = useState(false);

//   //disable and enable Save changes button
//   const [enableButton, setEnableButton] = useState(false);

//   //handle No Button
//   // const handleNoButton = () => {
//   //   dispatch(editTradeAccessManagementModalSystemAdmin(false));
//   // };

//   //Trade Rights Data
//   const [tradeRightsData, setTradeRightsData] = useState({
//     listOfInstruments: [],
//     maxTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
//     minTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
//     totalLimit: { value: 0, errorMessage: "", errorStatus: false },
//   });

//   //Instrument Table Data
//   const [instrumentDataSource, setInstrumentDataSource] = useState([]);
//   console.log(instrumentDataSource, "instrumentDataSource");

//   useEffect(() => {
//     if (GetBranchTradeRights !== null) {
//       try {
//         if (
//           GetBranchTradeRights.listOfInstruments !== null &&
//           GetBranchTradeRights.listOfInstruments !== undefined &&
//           GetBranchTradeRights.listOfInstruments.length > 0
//         ) {
//           if (
//             GetAllInstruments !== null &&
//             GetAllInstruments.instruments.length > 0
//           ) {
//             const newDataMaping = GetBranchTradeRights.listOfInstruments.map(
//               (rowTableData, index) => {
//                 let findInstrumentName = GetAllInstruments.instruments.find(
//                   (instrumentName, index) =>
//                     instrumentName.instrumentID === rowTableData.instrumentID
//                 );
//                 if (findInstrumentName !== undefined) {
//                   return {
//                     ...rowTableData,
//                     instrumentName: findInstrumentName.instrumentName,
//                   };
//                 }
//                 return rowTableData;
//               }
//             );

//             let listInstruments = newDataMaping.map((list, index) => {
//               return {
//                 value: list.instrumentID,
//                 label: list.instrumentName,
//               };
//             });
//             setSelectInstruments(listInstruments);
//             setInstrumentDataSource(newDataMaping);
//             setTradeRightsData({
//               maxTransactionLimit: {
//                 value: GetBranchTradeRights.maxTransactionLimit,
//               },
//               minTransactionLimit: {
//                 value: GetBranchTradeRights.minTransactionLimit,
//               },
//               totalLimit: { value: GetBranchTradeRights.totalLimit },
//             });
//           }
//         }
//       } catch (error) {}
//     }
//   }, [GetBranchTradeRights, GetAllInstruments]);
//   //checkbox value change method
//   const handleCheckboxChange = (record, field, event) => {
//     console.log(event, "checkedcheckedchecked");
//     try {
//       setInstrumentDataSource((prevData) =>
//         prevData.map((rowData) => {
//           if (rowData.instrumentID === record.instrumentID) {
//             return {
//               ...rowData,
//               [field]: event,
//             };
//           }
//           return rowData; // Moved outside the 'if' block
//         })
//       );
//     } catch (error) {}
//   };

//   //table columns for corporate
//   const columns = [
//     {
//       title: "",
//       children: [
//         {
//           title: "instrumentID",
//           dataIndex: "instrumentName",
//           key: "instrumentName",
//           align: "center",
//         },
//       ],
//       key: "",
//       dataIndex: "",
//       align: "center",
//     },

//     {
//       title: "Cross Rate",
//       key: "CrossRate",
//       children: [
//         {
//           title: "Buy",
//           dataIndex: "isCrossRateBuy",
//           key: "isCrossRateBuy",
//           align: "center",
//           render: (_, record) => (
//             <Checkbox
//               checked={record.isCrossRateBuy}
//               onChange={(event) =>
//                 handleCheckboxChange(
//                   record,
//                   "isCrossRateBuy",
//                   event.target.checked
//                 )
//               }
//             />
//           ),
//         },
//         {
//           title: "Sell",
//           dataIndex: "isCrossRateSell",
//           key: "isCrossRateSell",
//           align: "center",
//           render: (_, record) => (
//             <Checkbox
//               checked={record.isCrossRateSell}
//               onChange={(event) =>
//                 handleCheckboxChange(
//                   record,
//                   "isCrossRateSell",
//                   event.target.checked
//                 )
//               }
//             />
//           ),
//         },
//       ],
//     },
//     {
//       title: "Parity",
//       key: "Parity",
//       children: [
//         {
//           title: "Buy",
//           dataIndex: "isParityBuy",
//           key: "isParityBuy",
//           align: "center",
//           render: (_, record) => (
//             <Checkbox
//               checked={record.isParityBuy}
//               onChange={(event) =>
//                 handleCheckboxChange(
//                   record,
//                   "isParityBuy",
//                   event.target.checked
//                 )
//               }
//             />
//           ),
//         },
//         {
//           title: "Sell",
//           dataIndex: "isParitySell",
//           key: "isParitySell",
//           align: "center",
//           render: (_, record) => (
//             <Checkbox
//               checked={record.isParitySell}
//               onChange={(event) =>
//                 handleCheckboxChange(
//                   record,
//                   "isParitySell",
//                   event.target.checked
//                 )
//               }
//             />
//           ),
//         },
//       ],
//     },
//     {
//       // title: "",
//       // key: "",
//       // dataIndex: "",
//       // align: "center",
//       children: [
//         {
//           title: "Forward",
//           dataIndex: "isForward",
//           key: "isForward",
//           align: "center",
//           render: (_, record) => (
//             <Checkbox
//               checked={record.isForward}
//               onChange={(event) =>
//                 handleCheckboxChange(record, "isForward", event.target.checked)
//               }
//             />
//           ),
//         },
//       ],
//     },
//     {
//       title: "",
//       children: [
//         {
//           title: "Discounting",
//           dataIndex: "isDiscounting",
//           key: "isDiscounting",
//           align: "center",
//           render: (_, record) => (
//             <Checkbox
//               checked={record.isDiscounting}
//               onChange={(event) =>
//                 handleCheckboxChange(
//                   record,
//                   "isDiscounting",
//                   event.target.checked
//                 )
//               }
//             />
//           ),
//         },
//       ],
//       // key: "",
//       // dataIndex: "",
//       // align: "center",
//     },
//     {
//       title: "",
//       children: [
//         {
//           title: "Active",
//           dataIndex: "isActive",
//           key: "isActive",
//           align: "center",
//           render: (_, record) => (
//             <CustomSwitch
//               size="small"
//               checked={record.isActive}
//               onChange={(event) =>
//                 handleCheckboxChange(record, "isActive", event)
//               }
//             />
//           ),
//         },
//       ],
//       key: "",
//       dataIndex: "",
//       align: "center",
//     },
//     {
//       title: "",
//       children: [
//         {
//           title: "Hide",
//           dataIndex: "isViewOnly",
//           key: "isViewOnly",
//           align: "center",
//           render: (_, record) => (
//             <CustomSwitch
//               checked={record.isViewOnly}
//               onChange={(event) =>
//                 handleCheckboxChange(record, "isViewOnly", event)
//               }
//               size="small"
//             />
//           ),
//         },
//       ],
//       key: "",
//       dataIndex: "",
//       align: "center",
//     },
//   ];

//   const handleValueChange = (e) => {
//     const { name, value } = e.target;

//     //Validation rules
//     const validateInput = {
//       totalLimit: (val) =>
//         val
//           .replace(/[^\d.]/g, "") // Allow only digits and dots
//           .replace(/^\./, "0.") // If user types "." first, convert to "0."
//           .replace(/(\..*)\./g, "$1"),
//       minTransactionLimit: (val) =>
//         val
//           .replace(/[^\d.]/g, "") // Allow only digits and dots
//           .replace(/^\./, "0.") // If user types "." first, convert to "0."
//           .replace(/(\..*)\./g, "$1"),
//       maxTransactionLimit: (val) =>
//         val
//           .replace(/[^\d.]/g, "") // Allow only digits and dots
//           .replace(/^\./, "0.") // If user types "." first, convert to "0."
//           .replace(/(\..*)\./g, "$1"),
//     };
//     const isFieldEmpty = (val) => val === "";
//     // Update field function
//     const updateField = (fieldName, fieldValue) => {
//       const validValue = validateInput[fieldName]
//         ? validateInput[fieldName](fieldValue)
//         : fieldValue;

//       const hasError = isFieldEmpty(validValue);

//       setTradeRightsData((prevState) => ({
//         ...prevState,
//         [fieldName]: {
//           value: validValue,
//           errorMessage: hasError ? "This field is required" : "",
//           errorStatus: hasError,
//         },
//       }));
//     };

//     // Update the specific field
//     updateField(name, value);
//   };

//   // const handleCancelButton = () => {
//   //   setTradeRightsData({
//   //     listOfInstruments: [],
//   //     maxTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
//   //     minTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
//   //     totalLimit: { value: 0, errorMessage: "", errorStatus: false },
//   //   });
//   // };

//   //Save Button
//   const handleSaveChangesButton = () => {
//     console.log("traderightsdata", info.id);
//     console.log("instrumentDataSource", instrumentDataSource);
//     console.log("tradeRightsData", tradeRightsData);
//     dispatch(ConfirmationModalSystemAdmin(true));
//     setModalState(1);
//   };

//   const handleConfirmationYes = useCallback(() => {
//     dispatch(editTradeAccessManagementModalSystemAdmin(false));
//     try {
//       if (modalState === 1) {
//         if (
//           tradeRightsData.maxTransactionLimit.value !== 0 &&
//           tradeRightsData.minTransactionLimit.value !== 0 &&
//           tradeRightsData.totalLimit.value !== 0
//         ) {
//           let updatedData = {
//             BranchID: info.id,
//             TotalLimit: Number(tradeRightsData.totalLimit.value),
//             MinTransactionLimit: Number(
//               tradeRightsData.maxTransactionLimit.value
//             ),
//             MaxTransactionLimit: Number(
//               tradeRightsData.maxTransactionLimit.value
//             ),
//             ListOfInstruments: instrumentDataSource,
//           };
//           dispatch(editTradeAccessManagementModalSystemAdmin(false));

//           dispatch(
//             UpdateBranchTradeRightsAPI(navigate, updatedData, handleCloseModal)
//           );
//         }
//       }
//     } catch (error) {}
//   }, [modalState, tradeRightsData]);

//   const handleNoButton = useCallback(() => {
//     if (modalState === 1) {
//       dispatch(ConfirmationModalSystemAdmin(false));
//       setModalState(0);
//     } else if (modalState === 2) {
//       dispatch(ConfirmationModalSystemAdmin(false));
//       setModalState(0);
//     }
//   }, [modalState]);

//   useEffect(() => {
//     dispatch(GetAllInstrumentsAPI(navigate));
//   }, []);

//   useEffect(() => {
//     if (GetAllInstruments !== null) {
//       console.log("GetAllInstruments is: ", GetAllInstruments);
//       try {
//         let newInstrumentsData = GetAllInstruments.instruments.map(
//           (instrument) => {
//             return {
//               ...instrument,
//               value: { value: instrument.instrumentID },
//               label: instrument.instrumentName,
//             };
//           }
//         );
//         setInstrumentOptions(newInstrumentsData);
//       } catch (error) {
//         return error;
//       }
//     }
//   }, [GetAllInstruments]);

//   //handle select categoryID
//   const handleSelectInstrument = async (selectedInstrument) => {
//     console.log(selectedInstrument, "selectedInstrument");
//     setSelectInstruments(selectedInstrument);

//     // setUpdateBranchData((prevState) => ({
//     //   ...prevState,
//     //   instrumentType: {
//     //     ...prevState.instrumentID,
//     //     value: selectedInstrument.value,
//     //   },
//     // }));
//   };

//   const handleCloseModal = useCallback(() => {
//     setTradeRightsData({
//       listOfInstruments: [],
//       maxTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
//       minTransactionLimit: { value: 0, errorMessage: "", errorStatus: false },
//       totalLimit: { value: 0, errorMessage: "", errorStatus: false },
//     });
//     setInstrumentDataSource([]);
//     console.log("handleCloseModalhandleCloseModal");
//   }, []);
//   return (
//     <Modal
//       show={BOPSystemAdminModal.editModalTradeAccessManagement}
//       setShow={
//         handleCloseModal
//         // (value) =>
//         // dispatch(editTradeAccessManagementModalSystemAdmin(value))
//       }
//       className="UniversalBOPModalStylesTradeAccessManagment"
//       modalHeaderClassName={"d-none"}
//       modalFooterClassName="UniversalBOPModalStylesfooterTradeAccessMangement"
//       size="xl"
//       // onHide={closeModal}
//       ModalBody={
//         <>
//           <Row>
//             <Col lg={12} md={12} sm={12}>
//               <span className={styles["HeaderNameLabel"]}>{info.name}</span>
//             </Col>
//           </Row>
//           <Row>
//             <Col lg={2} md={2} sm={12}></Col>
//             <Col lg={8} md={8} sm={12}>
//               <Row>
//                 <Col lg={6} md={6} sm={6}>
//                   <span className={styles["labels-add-bank"]}>
//                     Total Limit (PKR)
//                     <span className={styles["aesterick-color"]}>*</span>
//                   </span>
//                   <TextField
//                     name={"totalLimit"}
//                     labelClass="d-none"
//                     placeholder={"Total Limit"}
//                     value={
//                       tradeRightsData.totalLimit
//                         ? tradeRightsData.totalLimit.value
//                         : 0
//                     }
//                     onChange={handleValueChange}
//                     maxLength={10}
//                   />
//                 </Col>
//                 <Col lg={6} md={6} sm={6}>
//                   <span className={styles["labels-add-bank"]}>
//                     Instrument allowed
//                     <span className={styles["aesterick-color"]}>*</span>
//                   </span>
//                   <Select
//                     isMulti
//                     options={instrumentOptions}
//                     placeholder={"Select Instrument"}
//                     value={InstrumentID.value !== 0 ? InstrumentID : null}
//                     isSearchable
//                     onChange={handleSelectInstrument}
//                     classNamePrefix={"selectCateogyCorporateList"}
//                   />
//                 </Col>
//               </Row>
//               <Row className="mt-3">
//                 <Col lg={12} md={12} sm={12}>
//                   <span className={styles["labels-add-bank"]}>
//                     Default Transaction Amount Limit (Min-Max)
//                   </span>
//                 </Col>
//               </Row>
//               <Row className="mt-3">
//                 <Col lg={6} md={6} sm={6}>
//                   <TextField
//                     name={"minTransactionLimit"}
//                     labelClass="d-none"
//                     placeholder={"Min Amount Limit"}
//                     value={
//                       tradeRightsData.minTransactionLimit
//                         ? tradeRightsData.minTransactionLimit.value
//                         : 0
//                     }
//                     onChange={handleValueChange}
//                     maxLength={10}
//                   />
//                 </Col>
//                 <Col lg={6} md={6} sm={6}>
//                   <TextField
//                     name={"maxTransactionLimit"}
//                     labelClass="d-none"
//                     placeholder={"Max Amount Limit"}
//                     value={
//                       tradeRightsData.maxTransactionLimit
//                         ? tradeRightsData.maxTransactionLimit.value
//                         : 0
//                     }
//                     onChange={handleValueChange}
//                     maxLength={10}
//                   />
//                 </Col>
//               </Row>
//             </Col>
//             <Col lg={2} md={2} sm={12}></Col>
//           </Row>
//           <Row className="mt-3">
//             <Col lg={12} md={12} sm={12}>
//               <Table
//                 column={columns}
//                 pagination={false}
//                 rows={instrumentDataSource}
//                 className={"TradeAccessManagementEdit"}
//               />
//             </Col>
//           </Row>
//         </>
//       }
//       ModalFooter={
//         <>
//           <Row className="mt-5">
//             <Col
//               lg={12}
//               md={12}
//               sm={12}
//               className="d-flex justify-content-center gap-2"
//             >
//               <Button
//                 icon={<i className="icon-refresh"></i>}
//                 text={"Save Changes"}
//                 className={styles["AddBranchClass"]}
//                 iconClass={styles["IconClass"]}
//                 onClick={handleSaveChangesButton}
//                 disableBtn={
//                   tradeRightsData.totalLimit.value !== "0" ? false : true
//                 }
//               />

//               <Button
//                 icon={<i className="icon-close"></i>}
//                 text={"Cancel"}
//                 className={styles["CancelButton"]}
//                 iconClass={styles["IconClass"]}
//                 onClick={handleCloseModal}
//               />
//             </Col>
//           </Row>
//           {/* {saveChanges && <DeleteConfirmationModal />} */}
//           {showActivationModal === true && (
//             <ActivateConfirmationModal
//               handleYesButton={handleConfirmationYes}
//               handleNoButton={handleNoButton}
//             />
//           )}
//         </>
//       }
//     />
//   );
// };

// export default EditBranchTradeModal;
