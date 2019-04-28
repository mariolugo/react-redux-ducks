import React from "react";
import { Row, Col, Badge, Jumbotron, Container, Table } from "reactstrap";
import PropTypes from "prop-types";

function PokemonDetails({
  palette,
  setImg,
  setBackImg,
  pokemonDetails,
  sprite,
  spriteBack
}) {
  return (
    <div>
      <Jumbotron
        className="Pokemon-hero"
        style={{
          backgroundColor:
            typeof palette !== "undefined" ? palette.backgroundColor : ""
        }}
      >
        <Container fluid>
          <img
            src={sprite}
            ref={img => {
              setImg(img);
            }}
          />
          <img
            src={spriteBack}
            ref={img => {
              setBackImg(img);
            }}
          />

          <h1
            className="Pokemon-name"
            style={{
              color: typeof palette !== "undefined" ? palette.color : ""
            }}
          >
            {pokemonDetails.name}
          </h1>
          <h3>
            {pokemonDetails.types.map((types, i) => {
              return (
                <span key={i}>
                  <Badge
                    color="secondary"
                    style={{
                      backgroundColor:
                        typeof palette !== "undefined"
                          ? palette.alternativeColor
                          : "",
                      color:
                        typeof palette !== "undefined"
                          ? palette.backgroundColor
                          : ""
                    }}
                  >
                    {types.type.name}
                  </Badge>{" "}
                </span>
              );
            })}
          </h3>
        </Container>
      </Jumbotron>
      <Container>
        <Row className="Pokemon-row">
          <Col xs="12" sm="12">
            <h3 className="Pokemon-att-title">Height (meters)</h3>
            <h5 className="Pokemon-att-title">{pokemonDetails.height / 10}m</h5>
          </Col>
        </Row>
        <Row className="Pokemon-row">
          <Col xs="12" sm="12">
            <h3 className="Pokemon-att-title">Weight (kilograms)</h3>
            <h5 className="Pokemon-att-title">
              {pokemonDetails.weight / 10}kg
            </h5>
          </Col>
        </Row>
        <Row className="Pokemon-row">
          <Col xs="12" sm="12">
            <h3 className="Pokemon-att-title">
              Base experience (The base experience gained for defeating this
              Pokémon.)
            </h3>
            <h5 className="Pokemon-att-title">
              {pokemonDetails.base_experience} points
            </h5>
          </Col>
        </Row>
        <Row className="Pokemon-row">
          <Col xs="12" sm="12">
            <h3 className="Pokemon-att-title">Abilities</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name:</th>
                  <th>Is Hidden?</th>
                  <th>Slot</th>
                </tr>
              </thead>
              <tbody>
                {pokemonDetails.abilities.map((ability, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{ability.ability.name}</td>
                      <td>{ability.is_hidden.toString()}</td>
                      <td>{ability.slot}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="Pokemon-row">
          <Col xs="12" sm="12">
            <h3 className="Pokemon-att-title">Stats</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name:</th>
                  <th>Effort</th>
                  <th>Base Stat</th>
                </tr>
              </thead>
              <tbody>
                {pokemonDetails.stats.map((stat, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{stat.stat.name}</td>
                      <td>{stat.effort}</td>
                      <td>{stat.base_stat}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

PokemonDetails.propTypes = {
  palette: PropTypes.object,
  setImg: PropTypes.func,
  setBackImg: PropTypes.func,
  pokemonDetails: PropTypes.object,
  sprite: PropTypes.string,
  spriteBack: PropTypes.string
};

export default PokemonDetails;
