import React from "react";
import { Row, Col, Container, Button } from "reactstrap";
import {Link} from "react-router-dom";
import "./styles.css";

function Home(props) {
  return (
    <Container className="Home">
      <Row className="Buttons-row">
        <Col>
          <h1>Welcome to the Reducks Observable Pokedex!</h1>
          <Button tag={Link} to="/pokemons" color="primary">View pokemons</Button>{" "}
          <Button tag={Link} to="/items" color="primary">View items</Button>
        </Col>
      </Row>
      <Row className="Buttons-row">
        <Col>
          <h1>Simple Redux Form Asynchronous Validation</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
