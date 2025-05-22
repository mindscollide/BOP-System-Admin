import "./Header2.css";
import { Container, Nav, Dropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import BOPLogo from "../../../assets/images/logo-white.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutApi, signOut } from "../../../store/actions/Auth-Actions";
import { message } from "antd";
import { useState } from "react";
import SettingModal from "./Settings/Setting";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [SettingModalState, setSettingModalState] = useState(false);

  const onClickSetting = () => {
    setSettingModalState(true);
  };
  //HandleClick on logo
  const onClickLogo = () => {
    navigate("/BOP/AddBankUser");
  };
  function handelLogout() {
    dispatch(logOutApi(navigate))

  }
  return (
    <>
      <section className="bop_systemHeader">
        <Navbar className="d-flex justify-content-between">
          <Navbar.Brand>
            <img
              src={BOPLogo}
              width={200}
              alt=""
              className="BopLogoClass"
              onClick={onClickLogo}
            />
          </Navbar.Brand>
          <Dropdown>
            <Dropdown.Toggle className="dropdown-toggle-header2">
              <p className="user-name-header2">
                {localStorage.getItem("userName")}
              </p>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown_menu-Header2">
              <Dropdown.Item
                className="dropdown_menu-Item"
                onClick={onClickSetting}
              >
                <Nav.Link>
                  <i className="icon-settings me-1"></i>
                  <label className="dropdown-select-labels">Setting</label>
                </Nav.Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={handelLogout}>
                <i className="icon-logout me-1"></i>
                <label className="dropdown-select-labels">Logout</label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
      </section>
      {SettingModalState ? (
        <SettingModal
          SettingModalState={SettingModalState}
          setSettingModalState={setSettingModalState}
        />
      ) : null}
    </>
  );
};

export default Header;
