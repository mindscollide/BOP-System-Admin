import "./Header2.css";
import { Container, Nav, Dropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import BOPLogo from "../../../assets/images/logo-white.png";

const Header = () => {
  return (
    <>
      <Container fluid className="container-header-2">
        <Navbar>
          <Container fluid>
            <Navbar.Brand>
              <img src={BOPLogo} width={205} alt="" className="BopLogoClass" />
            </Navbar.Brand>
            <Dropdown>
              <Dropdown.Toggle className="dropdown-toggle-header2">
                <p className="user-name-header2">Owais Wajid</p>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown_menu-Header2">
                <Dropdown.Item>
                  <Nav.Link>
                    <i className="icon-settings me-1"></i>
                    <label className="dropdown-select-labels">Setting</label>
                  </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i class="icon-logout me-1"></i>
                  <label className="dropdown-select-labels">Logout</label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};

export default Header;
