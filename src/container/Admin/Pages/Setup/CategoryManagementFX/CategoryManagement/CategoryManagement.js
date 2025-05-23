import React, { useEffect, useRef, useState } from "react";
import "./CategoryManagement.css";
import { Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Loader,
} from "../../../../../../components/elements";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Collapse } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  DeleteCorporateCategoryAPI,
  getAllCorporatesCategory,
  UpdateBranchCataegoryMappingAPI,
  UpdatecorporateMapping,
} from "../../../../../../store/actions/Auth-Actions";
import { useSelector } from "react-redux";
import {
  forNumbersOnly,
  formatNumberForFourDecimal,
  numberformatgerWithFourDecimalValues,
} from "../../../../../../commen/functions/numberFormatter";
import DeleteModal from "../DeleteRejectModal/DeleRejectModal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
import { AddCategoryModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { UpdateCategoryAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
const CategoryManagement = () => {
  //Accordian
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const { AddCategory } = useSelector((state) => state);

  //local states Edit Corporate Use Modal Calling
  const AddCategoryGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.addCategoryModal
  );

  //Global state for All Categories Data
  const AllCategories = useSelector(
    (state) => state.auth?.GetAllCorporatesData ?? null
  );

  //Transforming Data for React Beautiful DND
  const transformAPIData = (apiData) => {
    return apiData.categories.map((category) => ({
      categoryID: `cat-${category.categoryID}`, // convert to string and prefix
      categoryName: category.categoryName,
      bidSpread: category.bidSpread,
      offerSpread: category.offerSpread,
      CatID: category.categoryID, // convert to string and prefix
      CounterParties: category.counterParties.map((cp) => ({
        CounterpartyID: `corp-${cp.counterPartyID}`, // convert to string and prefix
        CounterPartyName: cp.counterPartyName,
        CounterPartyType: cp.counterPartyType,
        CounterPartyUsers: cp.users.map((u) => ({
          email: u.email,
        })),
      })),
    }));
  };

  //Local State
  const [addData, setadDdata] = useState({
    category: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    bidSpread: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    offerSpread: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    AssetTypeId: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },

    BankID: 1,
  });
  const [categoryupdate, setCategoryUpdate] = useState({
    category: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    bidSpread: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    offerSpread: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    AssetTypeId: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },
    categoryID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    BankID: 1,
  });
  const [editCategoryList, setEditCategoryList] = useState([]);
  const [errormessege, seterrormessege] = useState(false);
  const [corporates, setCorporates] = useState([]);
  const [delteCateogry, setDeltecategory] = useState(null);
  const [deleteRejectModal, setDeleteRejectModal] = useState(false);

  // API call for get All categories
  useEffect(() => {
    try {
      dispatch(getAllCorporatesCategory(navigate));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Extracting the data of all the categories
  useEffect(() => {
    try {
      if (AllCategories && AllCategories !== null) {
        const transformedData = transformAPIData(AllCategories);
        setCorporates(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [AllCategories]);

  //for Auto focus
  const NameRef = useRef(null);

  //for Auto focus Render
  useEffect(() => {
    if (NameRef.current) {
      NameRef.current.focus();
    }
  }, []);

  //Add a Category Modal Trigger
  const handleAddaCategoryModal = () => {
    dispatch(AddCategoryModalSystemAdmin(true));
  };

  useEffect(() => {
    const deletecategoryData = auth.DeleteCategory;
    if (Object.keys(deletecategoryData).length > 0) {
      setDeltecategory(deletecategoryData);
    }
  }, [auth.DeleteCategory]);

  // store data of corporates in loacal variable
  useEffect(() => {
    let corporatesData = auth.Corporates;
    if (Object.keys(corporatesData).length > 0) {
      setCorporates(corporatesData);
    }
  }, [auth.Corporates]);

  //Main Card Scroller to Left
  const SlideLeft = () => {
    var Slider = document.getElementById("Slider");
    Slider.scrollLeft = Slider.scrollLeft - 300;
  };

  //Main Card Scroller to Right
  const Slideright = () => {
    var Slider = document.getElementById("Slider");
    Slider.scrollLeft = Slider.scrollLeft + 300;
  };

  //For Dragging the Main Card
  const handleDragEnd = (results) => {
    const { source, destination, type, draggableId } = results;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...corporates];
      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setCorporates(reorderedStores);
    } else {
      //Extracting the IDs Corporate and Category form the Results
      const sourceCategoryId = parseInt(source.droppableId.replace("cat-", ""));
      const corporateId = parseInt(draggableId.replace("corp-", ""));

      let counterPartyType = null;

      const sourceCategory = corporates.find(
        (cat) => cat.categoryID === source.droppableId
      );

      if (sourceCategory && Array.isArray(sourceCategory.CounterParties)) {
        const client = sourceCategory.CounterParties.find(
          (c) => c.CounterpartyID === draggableId
        );

        if (
          client &&
          client.CounterPartyType !== undefined &&
          client.CounterPartyType !== null
        ) {
          counterPartyType = client.CounterPartyType;

          if (counterPartyType === 1) {
            const data = {
              CategoryID: sourceCategoryId,
              CorporateID: corporateId,
            };
            console.log("Dispatching with data:", data);
            dispatch(UpdatecorporateMapping(navigate, data));
          } else {
            const data = { CategoryID: sourceCategoryId, BranchID: 5 };
            console.log("Dispatching with data:", data);
            dispatch(UpdateBranchCataegoryMappingAPI(navigate, data));
          }
        } else {
        }
      } else {
      }
    }
  };

  //This is for the corporate shown inside the main card i.e Corporate and branches
  const showCards = (data) => {
    if (!data || Object.keys(data).length === 0) return null;

    return (
      <Droppable droppableId={data.categoryID}>
        {(provided) => (
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.CounterParties && data.CounterParties.length > 0 ? (
                data.CounterParties.map((client, index) => (
                  <Draggable
                    key={client.CounterpartyID}
                    draggableId={client.CounterpartyID}
                    index={index}
                    type="column"
                  >
                    {(provided) => (
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="mt-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Collapse
                          className={
                            client.CounterPartyType === 1
                              ? "custom-collapse"
                              : "Branchcustom-collapse"
                          }
                          accordion
                        >
                          <Panel
                            header={
                              <div className="header-container">
                                <span className="company-name">
                                  {client.CounterPartyName}
                                </span>
                              </div>
                            }
                            key={client.CounterpartyID}
                            className={
                              client.CounterPartyType === 1
                                ? "custom-panel"
                                : "Branchcustom-panel"
                            }
                          >
                            {client.CounterPartyUsers &&
                            client.CounterPartyUsers.length > 0 ? (
                              client.CounterPartyUsers.map((user, i) => (
                                <p className="user-email" key={i}>
                                  {user.email}
                                </p>
                              ))
                            ) : (
                              <p className="no-user">No users</p>
                            )}
                          </Panel>
                        </Collapse>
                        {provided.placeholder}
                      </Col>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="NoCorporateMessage">No Data Available</p>
              )}
            </Col>
          </Row>
        )}
      </Droppable>
    );
  };

  // Check Edit Funtion to open Edit Modal
  const OpenEditCategory = (recorde, data) => {
    console.log(data, "datadata");

    setadDdata({
      category: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      bidSpread: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      offerSpread: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      AssetTypeId: {
        value: 1,
        errorMessage: "",
        errorStatus: false,
      },

      BankID: 1,
    });
    setCategoryUpdate({
      offerSpread: {
        value: formatNumberForFourDecimal(data.offerSpread),
        errorMessage: "",
        errorStatus: false,
      },
      category: {
        value: data.categoryName.trimStart(),
        errorMessage: "",
        errorStatus: false,
      },
      bidSpread: {
        value: formatNumberForFourDecimal(data.bidSpread),
        errorMessage: "",
        errorStatus: false,
      },
      categoryID: {
        value: data.categoryID,
        errorMessage: "",
        errorStatus: false,
      },
    });

    setEditCategoryList([recorde]);
  };

  // Check Edit Funtion to open Edit Modal
  const checkForEdit = (recorde) => {
    console.log(recorde, "recorderecorderecorde");
    let newdata = editCategoryList.find((element) => element === recorde);
    console.log(newdata, "recorderecorderecorde");

    if (newdata !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  //Handle Text fields in Update Modal Component
  const HandleUpdateChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "nameUpdate" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "").trimStart(); // updated to match handleValueChange
      if (valueCheck !== "") {
        setCategoryUpdate({
          ...categoryupdate,
          category: {
            value: valueCheck,
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "nameUpdate" && value === "") {
      setCategoryUpdate({
        ...categoryupdate,
        category: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Bidupdated" && value !== "") {
      if (forNumbersOnly(value.trimStart()) !== "") {
        if (numberformatgerWithFourDecimalValues(value.trimStart())) {
          setCategoryUpdate({
            ...categoryupdate,
            bidSpread: {
              value: numberformatgerWithFourDecimalValues(value.trimStart()),
              errorMessage: "",
              errorStatus: false,
            },
          });
        }
      }
    } else if (name === "Bidupdated" && value === "") {
      setCategoryUpdate({
        ...categoryupdate,
        bidSpread: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "Offerupdate" && value !== "") {
      if (forNumbersOnly(value.trimStart()) !== "") {
        if (numberformatgerWithFourDecimalValues(value.trimStart())) {
          setCategoryUpdate({
            ...categoryupdate,
            offerSpread: {
              value: numberformatgerWithFourDecimalValues(value.trimStart()),
              errorMessage: "",
              errorStatus: false,
            },
          });
        }
      }
    } else if (name === "Offerupdate" && value === "") {
      setCategoryUpdate({
        ...categoryupdate,
        offerSpread: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //Update Category API Function
  const UpdateCategory = (data) => {
    console.log(data, "updateModal");
    // Calling Update APi
    let newdata = {
      Category: categoryupdate.category.value,
      BidSpread: Number(categoryupdate.bidSpread.value),
      OfferSpread: Number(categoryupdate.offerSpread.value),
      CategoryId: Number(data.CatID),
    };
    dispatch(UpdateCategoryAPI(navigate, newdata));
    setEditCategoryList([]);
  };

  //Cancel Button trigger on Update Modal Category
  const CloseUpdateCategory = (recorde) => {
    setCategoryUpdate({
      category: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      bidSpread: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      offerSpread: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      AssetTypeId: {
        value: 1,
        errorMessage: "",
        errorStatus: false,
      },
      categoryID: {
        value: 0,
        errorMessage: "",
        errorStatus: false,
      },
      BankID: 1,
    });
    setEditCategoryList([]);
  };

  // Add Corporate Function with spinnner
  useEffect(() => {
    let corporatesData = AddCategory.addCategory;
    if (Object.keys(corporatesData).length > 0) {
      const newSourceItems = [...corporates];
      let data = {
        categoryName: addData.category.value,
        categoryID: corporatesData.categoryID,
        offerSpread: formatNumberForFourDecimal(addData.offerSpread.value),
        bidSpread: formatNumberForFourDecimal(addData.bidSpread.value),
        corporates: [],
      };
      newSourceItems.push(data);
      setCorporates(newSourceItems);
      setadDdata({
        category: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
        bidSpread: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
        offerSpread: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
        AssetTypeId: {
          value: 1,
          errorMessage: "",
          errorStatus: false,
        },

        BankID: 1,
      });
    }
  }, [AddCategory.addCategory]);

  //Delete Category API Function
  const handleDelteCliked = (id) => {
    let data = {
      CategoryId: parseInt(id),
    };
    dispatch(DeleteCorporateCategoryAPI(navigate, data));
  };

  // Update Category Modal Component
  const updateModal = (data, index) => {
    console.log(data, "updateModal");
    return (
      <Row>
        <>
          <Col lg={12} md={12} sm={12} className="add-cate-wrapper m-3">
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="Name_tag">
                  Name
                  <span className="red_steric">*</span>
                </span>
              </Col>
            </Row>

            <Row>
              <Col lg={12} md={12} sm={12} className="CreateMeetingInput">
                <TextField
                  name="nameUpdate"
                  applyClass="form-control2"
                  type="text"
                  maxLength={100}
                  labelClass="d-none"
                  required={true}
                  value={categoryupdate.category.value}
                  onChange={HandleUpdateChange}
                />
                <p
                  className={
                    errormessege && categoryupdate.category.value === ""
                      ? "errorMessage"
                      : "errorMessage_hidden"
                  }
                >
                  Please Fill all the credentials
                </p>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <span className="Name_tag">
                  Spread <span className="red_steric">*</span>
                </span>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col lg={6} md={6} sm={12} xs={12}>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <span className="Name_tag">Bid</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <TextField
                      name="Bidupdated"
                      applyClass="form-control2"
                      type="text"
                      maxLength={100}
                      labelClass="d-none"
                      required={true}
                      value={categoryupdate.bidSpread.value}
                      onChange={HandleUpdateChange}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <span className="Name_tag">Offer</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <TextField
                      name="Offerupdate"
                      applyClass="form-control2"
                      type="text"
                      maxLength={100}
                      labelClass="d-none"
                      required={true}
                      value={categoryupdate.offerSpread.value}
                      onChange={HandleUpdateChange}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2"
              >
                <Button
                  className="Update_button_category"
                  text="Update"
                  onClick={() => UpdateCategory(data)}
                />
                <Button
                  className="Cancel_button_cateogry"
                  text="Cancel"
                  onClick={() => CloseUpdateCategory(data.CounterpartyID)}
                />
              </Col>
            </Row>
          </Col>
        </>
        {/* )} */}
      </Row>
    );
  };

  return (
    <section className="SectionContainer">
      <Row className="mt-3">
        <Col lg={10} sm={10} md={11}>
          <span className="PageHeading">Category Management</span>
        </Col>
        <Col lg={2} md={2} sm={12} className="d-flex justify-content-center">
          <Button
            text={"Add a Category"}
            className={"AddCategoryButton"}
            onClick={handleAddaCategoryModal}
          />
        </Col>
      </Row>

      {/* <!--row  Begin--> */}

      <Row
        className="cat-management-wrapper d-flex mt-3"
        id="catManagementItem"
      >
        <Col lg={12} md={12} sm={12} className="Content_container">
          <Button
            icon={<i className="icon-arrow-left"></i>}
            className="leftarrow"
            onClick={SlideLeft}
          />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="ROOT" type="group" direction="horizontal">
              {(outerProvided) => (
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="Scroller-x-resolution"
                  id="Slider"
                  ref={outerProvided.innerRef}
                  {...outerProvided.droppableProps}
                >
                  {Array.isArray(corporates) && corporates.length > 0 ? (
                    <>
                      {corporates.map((data, index) => {
                        console.log(data, "datadata");
                        return (
                          <>
                            {checkForEdit(data.categoryID) ? (
                              updateModal(data, index)
                            ) : (
                              <Draggable
                                key={data.categoryID + data.CounterpartyID}
                                draggableId={
                                  data.categoryID + data.CounterpartyID
                                }
                                index={index}
                                type="column"
                              >
                                {(outerProvided) => (
                                  <Col
                                    className="cat-management-item m-1"
                                    ref={outerProvided.innerRef}
                                    {...outerProvided.draggableProps}
                                    {...outerProvided.dragHandleProps}
                                  >
                                    <Row className="item-inner">
                                      <Col className="cat-header">
                                        <Row className="mt-2">
                                          <Col
                                            className="cat-title"
                                            lg={6}
                                            sm={6}
                                            md={6}
                                          >
                                            {data.categoryName}
                                          </Col>
                                          <Col
                                            className="d-flex justify-content-end gap-1 align-items-center"
                                            lg={6}
                                            sm={6}
                                            md={6}
                                          >
                                            <span
                                              className="edit-cat d-inline-block"
                                              onClick={() =>
                                                OpenEditCategory(
                                                  data.categoryID,
                                                  data
                                                )
                                              }
                                            >
                                              <i class="icon-text-edit"></i>
                                            </span>

                                            <span
                                              className="delete-cat d-inline-block cursor-pointer"
                                              onClick={() =>
                                                handleDelteCliked(
                                                  data.categoryID
                                                )
                                              }
                                            >
                                              <i class="icon-trash"></i>
                                            </span>
                                          </Col>
                                          <Row>
                                            <Col lg={12} md={12} sm={12}>
                                              <hr className="Line" />
                                            </Col>
                                          </Row>
                                        </Row>

                                        <Row className="mt-2">
                                          <Col
                                            lg={6}
                                            sm={6}
                                            md={6}
                                            className="d-flex justify-content-start"
                                          >
                                            <Row>
                                              <Col
                                                lg={12}
                                                md={12}
                                                sm={12}
                                                className="text-center"
                                              >
                                                <div className="title_bid">
                                                  Bid
                                                </div>
                                                <div className="rate val-highlight1">
                                                  {data.bidSpread !== 0
                                                    ? formatNumberForFourDecimal(
                                                        data.bidSpread
                                                      )
                                                    : "0.00"}
                                                </div>
                                              </Col>
                                            </Row>
                                          </Col>

                                          <Col
                                            lg={6}
                                            sm={6}
                                            md={6}
                                            className="d-flex justify-content-end"
                                          >
                                            <Row>
                                              <Col
                                                lg={12}
                                                md={12}
                                                sm={12}
                                                className="text-center"
                                              >
                                                <div className="title_bid">
                                                  offer
                                                </div>
                                                <div className="rate val-highlight2">
                                                  {data.offerSpread !== 0
                                                    ? formatNumberForFourDecimal(
                                                        data.offerSpread
                                                      )
                                                    : "0.00"}
                                                </div>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Row className="cat-item-content">
                                        <Col
                                          className="customer"
                                          lg={12}
                                          sm={12}
                                          md={12}
                                        >
                                          {showCards(data)}
                                        </Col>
                                        {outerProvided.placeholder}
                                      </Row>
                                    </Row>
                                  </Col>
                                )}
                              </Draggable>
                            )}
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </Col>
              )}
            </Droppable>
          </DragDropContext>

          <Button
            icon={<i className="icon-arrow-right"></i>}
            className="righArrow"
            onClick={Slideright}
          />
        </Col>
      </Row>
      <DeleteModal
        delteCateogry={delteCateogry}
        deleteRejectModal={deleteRejectModal}
        setDeleteRejectModal={setDeleteRejectModal}
      />
      {AddCategoryGobalState && <AddCategoryModal />}
      {auth.Loading && <Loader />}
    </section>
  );
};

export default CategoryManagement;
