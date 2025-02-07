// import { Spin } from "antd";
// import { TextField } from "material-ui";
// import { Col, Form, Row } from "react-bootstrap";
// import { useSelector } from "react-redux";
// // import { useSelector } from "react-redux";

// export const updateModal = (data, index) => {
//   const { auth } = useSelector((state) => state);
//   const { AddCategory, UpdateCategoryMap } = useSelector((state) => state);
//   return (
//     <Row>
//       {UpdateCategoryMap.Spinner === true ? (
//         <>
//           <span className="customer-login-user-spinner m-3">
//             <Spin size="large" />
//           </span>
//         </>
//       ) : (
//         <>
//           <Col lg={12} md={12} sm={12} className="add-cate-wrapper m-3">
//             <Form onSubmit={UpdateCategory}>
//               <Row>
//                 <Col lg={12} md={12} sm={12}>
//                   <span className="Name_tag">
//                     Name
//                     <span className="red_steric">*</span>
//                   </span>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col lg={12} md={12} sm={12} className="CreateMeetingInput">
//                   <TextField
//                     name="nameUpdate"
//                     applyClass="form-control2"
//                     type="text"
//                     maxLength={100}
//                     labelClass="d-none"
//                     required={true}
//                     value={categoryupdate.category.value}
//                     onChange={HandleUpdateChange}
//                   />
//                   <p
//                     className={
//                       errormessege && categoryupdate.category.value === ""
//                         ? "errorMessage"
//                         : "errorMessage_hidden"
//                     }
//                   >
//                     Please Fill all the credentials
//                   </p>
//                 </Col>
//               </Row>

//               <Row className="mt-3">
//                 <Col lg={12} md={12} sm={12}>
//                   <span className="Name_tag">
//                     Spread <span className="red_steric">*</span>
//                   </span>
//                 </Col>
//               </Row>

//               <Row className="mt-2">
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                   <Row>
//                     <Col lg={12} md={12} sm={12}>
//                       <span className="Name_tag">Bid</span>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col lg={12} md={12} sm={12}>
//                       <TextField
//                         name="Bidupdated"
//                         applyClass="form-control2"
//                         type="text"
//                         maxLength={100}
//                         labelClass="d-none"
//                         required={true}
//                         value={categoryupdate.bidSpread.value}
//                         onChange={HandleUpdateChange}
//                       />
//                     </Col>
//                   </Row>
//                 </Col>
//                 <Col lg={6} md={6} sm={12} xs={12}>
//                   <Row>
//                     <Col lg={12} md={12} sm={12}>
//                       <span className="Name_tag">Offer</span>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col lg={12} md={12} sm={12}>
//                       <TextField
//                         name="Offerupdate"
//                         applyClass="form-control2"
//                         type="text"
//                         maxLength={100}
//                         labelClass="d-none"
//                         required={true}
//                         value={categoryupdate.offerSpread.value}
//                         onChange={HandleUpdateChange}
//                       />
//                     </Col>
//                   </Row>
//                 </Col>
//               </Row>
//               <Row className="mt-3">
//                 <Col
//                   lg={12}
//                   md={12}
//                   sm={12}
//                   className="d-flex justify-content-center gap-2"
//                 >
//                   <Button
//                     className="Update_button_category"
//                     text="Update"
//                     onClick={UpdateCategory}
//                   />
//                   <Button
//                     className="Cancel_button_cateogry"
//                     text="Cancel"
//                     onClick={() => CloseUpdateCategory(data.corporateID)}
//                   />
//                 </Col>
//               </Row>
//             </Form>
//           </Col>
//         </>
//       )}
//     </Row>
//   );
// };
