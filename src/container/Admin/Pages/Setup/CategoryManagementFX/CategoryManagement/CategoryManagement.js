import React, { useEffect, useRef, useState } from "react";
import "./CategoryManagement.css";
import { Col, Row, Form, Container } from "react-bootstrap";
import {
  TextField,
  Button,
  Loader,
} from "../../../../../../components/elements";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Collapse } from "antd";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  DeleteCorporateCategoryAPI,
  getAllCorporatesCategory,
  UpdatecorporateMapping,
} from "../../../../../../store/actions/Auth-Actions";
import { useSelector } from "react-redux";

import { Addcategory } from "../../../../../../store/actions/AddCategoryActions";
import {
  forNumbersOnly,
  formatNumberForFourDecimal,
  numberformatgerWithFourDecimalValues,
  stringConvertintoNumber,
} from "../../../../../../commen/functions/numberFormatter";
import DeleteModal from "../DeleteRejectModal/DeleRejectModal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
import { AddCategoryModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
const CategoryManagement = () => {
  //Accordian
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const { AddCategory, UpdateCategoryMap } = useSelector((state) => state);

  //local states Edit Corporate Use Modal Calling
  const AddCategoryGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.addCategoryModal
  );

  //Global state for All Categories Data
  const AllCategories = useSelector(
    (state) => state.auth?.GetAllCorporatesData ?? null
  );

  const [activeKey, setActiveKey] = useState([]);
  const [corporates, setCorporates] = useState([]);

  //For edit a Category
  const [editCategoryList, setEditCategoryList] = useState([]);
  const [errormessege, seterrormessege] = useState(false);
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

  //local states For Adding a Category
  const [addCategoryList, setAddCategoryList] = useState([]);
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

  useEffect(() => {
    try {
      if (AllCategories && AllCategories !== null) {
        console.log(AllCategories, "AllCategoriesAllCategories");
        setCorporates(AllCategories.categories);
      }
    } catch (error) {
      console.log(error);
    }
  }, [AllCategories]);

  //for Auto focus
  const NameRef = useRef(null);

  useEffect(() => {
    if (NameRef.current) {
      NameRef.current.focus();
    }
  }, []);

  //Active key collapser
  const handleCollapseChange = (key) => {
    setActiveKey(key);
  };

  //Add a Category Modal Trigger
  const handleAddaCategoryModal = () => {
    dispatch(AddCategoryModalSystemAdmin(true));
  };

  useEffect(() => {
    const deletecategoryData = auth.DeleteCategory;
    if (Object.keys(deletecategoryData).length > 0) {
      setDeltecategory(deletecategoryData);
    }
    // console.log("deletecategoryDatadeletecategoryData", deletecategoryData);
  }, [auth.DeleteCategory]);

  // store data of corporates in loacal variable
  useEffect(() => {
    let corporatesData = auth.Corporates;
    if (Object.keys(corporatesData).length > 0) {
      setCorporates(corporatesData);
    }
  }, [auth.Corporates]);

  //Sliders Function
  const SlideLeft = () => {
    var Slider = document.getElementById("Slider");
    Slider.scrollLeft = Slider.scrollLeft - 300;
  };

  const Slideright = () => {
    var Slider = document.getElementById("Slider");
    Slider.scrollLeft = Slider.scrollLeft + 300;
  };

  //  for drage card
  const handleDragEnd = (results) => {
    const { source, destination, type } = results;
    // console.log("handleDragEnd", results);
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
      const itemSourceIndex = source.index;
      const itemDestinationIndex = destination.index;

      const storeSourceIndex = corporates.findIndex(
        (store) => store.categoryID === source.droppableId
      );
      // console.log("handleDragEnd for sender ", storeSourceIndex);

      const storeDestinationIndex = corporates.findIndex(
        (store) => store.categoryID === destination.droppableId
      );

      // console.log("handleDragEnd for reciver", storeDestinationIndex);
      // console.log("handleDragEnd packege", results.draggableId);
      // console.log("handleDragEnd", corporates[storeSourceIndex]);
      // console.log("handleDragEnd", corporates[storeSourceIndex]);
      let data = {
        CategoryID: corporates[storeDestinationIndex].categoryID,
        CorporateId: results.draggableId,
      };
      dispatch(UpdatecorporateMapping(navigate, data));
    }
  };

  //This is for the corporate shown inside the main card i.e Corporate and branches
  const showCards = (data) => {
    // console.log("showCardsshowCards", data);
    if (!data || Object.keys(data).length === 0) return null;
    return (
      <Droppable droppableId={data.categoryID}>
        {(provided) => (
          <Row style={{ height: "80vh" }}>
            {/* {console.log("authauth1234 ClientsClients", data)} */}
            <Col
              lg={12}
              md={12}
              sm={12}
              className="mt-0"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{}}
            >
              <>
                {data.counterParties && data.counterParties.length > 0 ? (
                  data.counterParties.map((Clients, index) => {
                    console.log(Clients, "hello");
                    return (
                      <Draggable
                        key={Clients.corporateID}
                        // draggableId={Clients.corporateID}
                        draggableId={"5"}
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
                              className="custom-collapse"
                              activeKey={activeKey}
                              onChange={handleCollapseChange}
                            >
                              <Panel
                                header={
                                  <div className="header-container">
                                    <span className="company-name">
                                      {Clients.counterPartyName}
                                    </span>
                                  </div>
                                }
                                key="1"
                                className="custom-panel"
                              >
                                {Clients.users && Clients.users.length > 0 ? (
                                  <>
                                    {Clients.users.map(
                                      (corporaterUser, index) => {
                                        return (
                                          <p className="user-email">
                                            {corporaterUser.email}
                                          </p>
                                        );
                                      }
                                    )}
                                  </>
                                ) : (
                                  <p className="no-user"></p>
                                )}
                              </Panel>
                            </Collapse>
                            {provided.placeholder}
                          </Col>
                        )}
                      </Draggable>
                    );
                  })
                ) : (
                  <>
                    <p className="NoCorporateMessage"></p>
                  </>
                )}
              </>
            </Col>
          </Row>
        )}
      </Droppable>
    );
  };

  // for edit
  // Update Corporate Function with spinnner
  // useEffect(() => {
  //   let corporatesData = UpdateCategoryMap.UpdateCategory;
  //   if (Object.keys(corporatesData).length > 0) {
  //     console.log("authauth12 UpdateCategoryMap", corporatesData);
  //     console.log("authauth12 UpdateCategoryMap", categoryupdate);
  //     let id = categoryupdate.categoryID.value;
  //     const categoryIndex = corporates.findIndex(
  //       (store) => store.categoryID === id.toString()
  //     );
  //     console.log("authauth12 UpdateCategoryMap", categoryIndex);

  //     const newSourceItems = [...corporates];
  //     const newSourceItem = newSourceItems[categoryIndex];
  //     console.log("authauth12 UpdateCategoryMap", newSourceItem);
  //     console.log("authauth12 UpdateCategoryMapvvvv", categoryupdate);
  //     // stringConvertintoNumber(addData.bidSpread.value)
  //     let data = {
  //       categoryName: categoryupdate.category.value,
  //       categoryID: categoryupdate.categoryID.value,
  //       offerSpread: parseInt(categoryupdate.offerSpread.value),
  //       bidSpread: parseInt(categoryupdate.bidSpread.value),
  //       corporates: newSourceItems[categoryIndex].corporates,
  //     };
  //     if (categoryIndex !== -1) {
  //       newSourceItems[categoryIndex] = data;
  //       setCorporates(newSourceItems);
  //     }
  //     setEditCategoryList([]);
  //     setCategoryUpdate({
  //       category: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: false,
  //       },
  //       bidSpread: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: false,
  //       },
  //       offerSpread: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: false,
  //       },
  //       AssetTypeId: {
  //         value: 1,
  //         errorMessage: "",
  //         errorStatus: false,
  //       },
  //       categoryID: {
  //         value: 0,
  //         errorMessage: "",
  //         errorStatus: false,
  //       },
  //       BankID: 1,
  //     });
  //   }
  // }, [UpdateCategoryMap.UpdateCategory]);

  const OpenEditCategory = (recorde, data) => {
    console.log(data, "datadata");
    // console.log(
    //   " i am clicked",
    //   numberformatgerWithFourDecimalValues(data.bidSpread.trimStart())
    // );
    setAddCategoryList([]);
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
    // console.log(" i am clicked", formatNumberForFourDecimal(data.bidSpread));

    setEditCategoryList([recorde]);
  };

  const checkForEdit = (recorde) => {
    let newdata = editCategoryList.find((element) => element === recorde);
    // console.log(newdata, "gggggggggggggg");
    // console.log(recorde, "hhhhhhh");
    if (newdata !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const HandleUpdateChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "nameUpdate" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      // console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCategoryUpdate({
          ...categoryupdate,
          category: {
            value: valueCheck.trimStart(),
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
      let valueCheck = value.replace(/[^0-9]+/g, "");
      // console.log("valuevalueemailvaluevalueemail", value);
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
      // console.log(
      //   "valuevalueemailvaluevalueemail",
      //   numberformatgerWithFourDecimalValues(value.trimStart())
      // );
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

  const UpdateCategory = () => {};

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
      setAddCategoryList([]);
    }
  }, [AddCategory.addCategory]);

  const OpenAddCategory = (recorde) => {
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
    setAddCategoryList([recorde]);
  };

  const handleDelteCliked = (id) => {
    let bankId = localStorage.getItem("bankID");
    // console.log("handleDelteClikedhandleDelteCliked", id);
    let data = {
      CategoryId: parseInt(id),
      BankID: parseInt(bankId),
    };
    dispatch(DeleteCorporateCategoryAPI(navigate, data, setDeleteRejectModal));
  };

  const checkForAdd = (recorde) => {
    let newdata = addCategoryList.find((element) => element === recorde);
    // console.log(newdata, "hhhhhhh");
    if (newdata !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const CategoryManageState = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      // console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setadDdata({
          ...addData,
          category: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "name" && value === "") {
      setadDdata({
        ...addData,
        category: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
      });
    }

    if (name === "Bid" && value !== "") {
      // console.log("valuevalueemailvaluevalueemail", value);
      if (forNumbersOnly(value.trimStart()) !== "") {
        if (numberformatgerWithFourDecimalValues(value.trimStart())) {
          setadDdata({
            ...addData,
            bidSpread: {
              value: numberformatgerWithFourDecimalValues(value.trimStart()),
              errorMessage: "",
              errorStatus: false,
            },
          });
        }
      }
    } else if (name === "Bid" && value === "") {
      setadDdata({
        ...addData,
        bidSpread: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "Offer" && value !== "") {
      // console.log("valuevalueemailvaluevalueemail", value);
      if (forNumbersOnly(value.trimStart()) !== "") {
        if (numberformatgerWithFourDecimalValues(value)) {
          setadDdata({
            ...addData,
            offerSpread: {
              value: numberformatgerWithFourDecimalValues(value),
              errorMessage: "",
              errorStatus: false,
            },
          });
        }
      }
    } else if (name === "Offer" && value === "") {
      setadDdata({
        ...addData,
        offerSpread: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  const AfterClickAdd = async (e) => {
    e.preventDefault();
    if (addData.category.value !== "") {
      seterrormessege(false);
      let bankId = localStorage.getItem("bankID");
      let Userid = localStorage.getItem("userID");
      // console.log(" i am clicked", addData);

      let data = {
        Category: addData.category.value,
        BidSpread: stringConvertintoNumber(addData.bidSpread.value),
        OfferSpread: stringConvertintoNumber(addData.offerSpread.value),
        AssetTypeId: 1,
        BankID: parseInt(bankId),
        UserId: parseInt(Userid),
      };
      // console.log(" i am clicked", data);

      await dispatch(Addcategory(navigate, data));
    } else {
      seterrormessege(true);
    }
  };

  const CloseNewCategory = (recorde) => {
    seterrormessege(false);
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
    setAddCategoryList([]);
  };

  const addModal = (data, index) => {
    return (
      <Row>
        {AddCategory.Spinner === true ? (
          <>
            <span className="customer-login-user-spinner">
              <Spin size="large" />
            </span>
          </>
        ) : (
          <>
            <Col
              lg={12}
              md={12}
              sm={12}
              // key={newInstanceId}
              className="add-cate-wrapper m-3"
            >
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Form onSubmit={AfterClickAdd}>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <span className="Name_tag">
                          Name <span className="red_steric">*</span>
                        </span>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="CreateMeetingInput"
                      >
                        <TextField
                          name="name"
                          applyClass="form-control2"
                          ref={NameRef}
                          type="text"
                          autoFocus
                          maxLength={100}
                          labelClass="d-none"
                          value={addData.category.value}
                          onChange={CategoryManageState}
                        />
                      </Col>
                    </Row>
                    <p
                      className={
                        errormessege && addData.category.value === ""
                          ? "errorMessage"
                          : "errorMessage_hidden"
                      }
                    >
                      Please Fill all the credentials
                    </p>

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
                              name="Bid"
                              applyClass="form-control2"
                              type="text"
                              maxLength={100}
                              labelClass="d-none"
                              required={true}
                              value={addData.bidSpread.value}
                              onChange={CategoryManageState}
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
                              name="Offer"
                              applyClass="form-control2"
                              type="text"
                              maxLength={100}
                              labelClass="d-none"
                              required={true}
                              value={addData.offerSpread.value}
                              onChange={CategoryManageState}
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
                          className="Add_button_category"
                          text="Add"
                          onClick={AfterClickAdd}
                        />
                        <Button
                          className="Cancel_button_cateogry"
                          text="Cancel"
                          onClick={CloseNewCategory}
                        />
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    );
  };

  const updateModal = (data, index) => {
    return (
      <Row>
        {/* {UpdateCategoryMap.Spinner === true ? (
          <>
            <span className="customer-login-user-spinner m-3">
              <Spin size="large" />
            </span>
          </>
        ) : ( */}
        <>
          <Col lg={12} md={12} sm={12} className="add-cate-wrapper m-3">
            <Form onSubmit={UpdateCategory}>
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
                    onClick={UpdateCategory}
                  />
                  <Button
                    className="Cancel_button_cateogry"
                    text="Cancel"
                    onClick={() => CloseUpdateCategory(data.corporateID)}
                  />
                </Col>
              </Row>
            </Form>
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
            <Droppable
              droppableId="ROOT"
              type="group"
              direction="horizontal"
              // direction="vertical"
            >
              {/* <!-- cat-item --> */}
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
                        return (
                          <>
                            {checkForEdit(data.categoryID) ? (
                              updateModal(data, index)
                            ) : (
                              <Draggable
                                key={data.categoryID + data.corporateID}
                                draggableId={data.categoryID + data.corporateID}
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
                                            className="d-flex justify-content-end gap-1"
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
                                              <i className="icon-text-edit"></i>
                                            </span>
                                            <span
                                              className="add-cat d-inline-block"
                                              onClick={() =>
                                                OpenAddCategory(data.categoryID)
                                              }
                                            ></span>
                                            <span
                                              className="delete-cat d-inline-block cursor-pointer"
                                              onClick={() =>
                                                handleDelteCliked(
                                                  data.categoryID
                                                )
                                              }
                                            >
                                              <i className="icon-trash"></i>
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
                                                  {data.bidSpread !== ""
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
                                                  {data.offerSpread !== ""
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
                                    {/* {outerProvided.placeholder} */}
                                  </Col>
                                )}
                              </Draggable>
                            )}

                            {/* {checkForAdd(data.categoryID)
                              ? addModal(data, index)
                              : null} */}
                          </>
                        );
                      })}
                    </>
                  ) : null}

                  {/* {outerProvided.placeholder} */}
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
