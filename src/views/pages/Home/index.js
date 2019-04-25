import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { listOperations } from "../../../state/ducks/list";
import { idFromUrl } from "../../../utils";
import {
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import "./styles.css";

function Home(props) {
  console.log("props", props);
  let { list } = props;

  const { isFetching } = list;

  let pokemons = [];
  let nextUrl = "http://pokeapi.co/api/v2/pokemon/?limit=30";
  let prevUrl = "";

  useEffect(() => {
    props.fetchList(nextUrl);
  }, []);

  function nextPokemons() {
    props.fetchList(nextUrl);
  }

  function prevPokemons() {
    props.fetchList(prevUrl);
  }

  if (typeof list.list !== "undefined") {
    console.log("list", list.list);
    pokemons = list.list.results;
    nextUrl = list.list.next;
    prevUrl = list.list.previous;
  }

  console.log("prevUrl", prevUrl);
  console.log("pokemons", pokemons);

  return (
    <React.Fragment>
      {isFetching && (
        <Row>
          <Col>
            <p>Loading pokemons...</p>
          </Col>
        </Row>
      )}
      {!isFetching && (
        <Row className="Pokemon-list-row">
          {pokemons.length > 0 &&
            pokemons.map((pokemon, index) => {
              return (
                <Col key={index} xs="6" sm="6" md="2">
                  <Card className="Card">
                    <CardImg
                      top
                      width="100%"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idFromUrl(
                        pokemon.url
                      )}.png`}
                      alt={`Pokemon ${pokemon.name} image`}
                    />
                    <CardBody>
                      <CardTitle className="Card-title">{pokemon.name}</CardTitle>
                      <Button color="primary">View Details</Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>
      )}
      <Row className="Buttons-row">
        <Col>
          {prevUrl !== "" &&
            typeof prevUrl !== "undefined" &&
            prevUrl !== null && (
              <Button color="primary" onClick={prevPokemons}>
                Get prev
              </Button>
            )}{" "}
          <Button color="primary" onClick={nextPokemons}>
            Get next
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    list: state.list.list
  };
};

const mapDispatchToProps = {
  fetchList: listOperations.fetchList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
