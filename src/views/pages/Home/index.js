import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listOperations } from "../../../state/ducks/pokemons";
import {
  Row,
  Col,
} from "reactstrap";
import "./styles.css";

function Home(props) {
  return (
    <React.Fragment>
      <Row className="Buttons-row">
        <Col>
          <p>Hola</p>
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    pokemons: state.pokemons.pokemons
  };
};

const mapDispatchToProps = {
  fetchList: listOperations.fetchList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
