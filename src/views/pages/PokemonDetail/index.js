import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { pokemonOperations } from "../../../state/ducks/pokemons";
import { Row, Col, Badge } from "reactstrap";
import { Jumbotron, Container } from "reactstrap";
import getImagePalette from "image-palette-core";
import "./styles.css";

function PokemonDetail(props) {
  const { fetchPokemonDetails, pokemon } = props;
  const { params } = props.match;
  const { name } = params;
  const { isFetching } = pokemon;
  const pokemonDetails = pokemon.pokemon;
  const image = new Image();
  image.crossOrigin = "Anonymous";

  console.log("pokemonDetails", pokemonDetails);

  let sprite = "";
  let spriteBack = "";

  if (typeof pokemonDetails !== "undefined") {
    sprite = pokemonDetails.sprites["front_default"];
    spriteBack = pokemonDetails.sprites["back_default"];
  }

  const [img, setImg] = useState();
  const [palette, setPalette] = useState();

  useEffect(() => {
    if (typeof img === "undefined") {
      fetchPokemonDetails(name);
    }

    if (typeof sprite !== "undefined" && typeof palette === "undefined") {
      image.src = sprite;
      image.onload = function() {
        // The image *must* be loaded before calling `getImagePalette`
        setPalette(getImagePalette(image));
      };
    }

  }, [img, palette]);

  return (
    <div>
      {isFetching && (
        <Row>
          <Col>
            <p>Loading pokemon details...</p>
          </Col>
        </Row>
      )}
      {!isFetching && typeof pokemonDetails !== "undefined" && (
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
                          color: "black"
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
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    pokemon: state.pokemons.pokemons
  };
};

const mapDispatchToProps = {
  fetchPokemonDetails: pokemonOperations.fetchPokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail);
