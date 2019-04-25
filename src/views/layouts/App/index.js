import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";

function App({ children }) {
  let [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }
  return (
    <div className="App">
      <Navbar color="faded" light expand="md" className="App-header">
        <NavbarBrand href="/">React Reducks Observable</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Items</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                Locations
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Github Repo</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      <Container>{children}</Container>
    </div>
  );
}

export default App;
