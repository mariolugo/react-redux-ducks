import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listOperations } from "../../../state/ducks/pokemons";
import { idFromUrl } from "../../../utils";
import {
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";
import "./styles.css";

function Home(props) {

  const { fetchList } = props;
  const { isFetching, pokemons } = props.pokemons;

  let pokemonsList = [];
  let nextUrl = "http://pokeapi.co/api/v2/pokemon/?limit=30";
  let prevUrl = "";

  useEffect(() => {
    fetchList(nextUrl);
  }, []);

  function nextPokemons() {
    props.fetchList(nextUrl);
  }

  function prevPokemons() {
    props.fetchList(prevUrl);
  }

  if (typeof pokemons !== "undefined") {
    pokemonsList = pokemons.results;
    nextUrl = pokemons.next;
    prevUrl = pokemons.previous;
  }

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
          {pokemonsList.length > 0 &&
            pokemonsList.map((pokemon, index) => {
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
