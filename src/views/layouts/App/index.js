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

import {Link} from "react-router-dom";

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
        <NavbarBrand tag={Link} to="/">React Reducks Observable</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
              <NavLink tag={Link} to="/pokemons">Pokemons</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/items">Items</NavLink>
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
      <Container className="Content">{children}</Container>
    </div>
  );
}

export default App;
