import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { pokemonOperations } from "../../../state/ducks/pokemons";
import { PokemonDetailsComponent, LoadingComponent } from "../../../components";
import getImagePalette from "image-palette-core";
import "./styles.css";

function PokemonDetail(props) {
  const { fetchPokemonDetails, pokemon } = props;
  const { params } = props.match;
  const { name } = params;
  const { isFetching } = pokemon;
  const pokemonDetails = pokemon.pokemon;

  //image of pokemon to get its palette
  const image = new Image();
  //the server has "Access-Control-Allow-Origin "*"", so we need to set
  //crossOrigin to Anonymous
  image.crossOrigin = "Anonymous";

  console.log("pokemonDetails", pokemonDetails);

  let sprite = "";
  let spriteBack = "";

  if (typeof pokemonDetails !== "undefined") {
    sprite = pokemonDetails.sprites["front_default"];
    spriteBack = pokemonDetails.sprites["back_default"];
  }

  //state variables
  const [img, setImg] = useState();
  const [backImg, setBackImg] = useState();
  const [palette, setPalette] = useState();

  useEffect(() => {
    // if images are undefined, fetch pokemon details once
    // so it will no re-fetch in the re-render
    if (typeof img === "undefined" && typeof backImg === "undefined") {
      fetchPokemonDetails(name);
    }

    // wait until sprite is loaded and palette undefined to get the palette
    if (typeof sprite !== "undefined" && typeof palette === "undefined") {
      image.src = sprite;
      image.onload = function() {
        //set palette state with the getImagePalette function, wait until
        //image is loaded completely
        setPalette(getImagePalette(image));
      };
    }
    //component will only re-render when this variables changes
  }, [img, palette, backImg]);

  return (
    <div>
      {isFetching && <LoadingComponent text={"Loading pokemon details..."} />}
      {!isFetching && typeof pokemonDetails !== "undefined" && (
        <PokemonDetailsComponent
          palette={palette}
          setImg={setImg}
          setBackImg={setBackImg}
          pokemonDetails={pokemonDetails}
          sprite={sprite}
          spriteBack={spriteBack}
        />
      )}
    </div>
  );
}

//get the pokemon state and map it to props
const mapStateToProps = state => {
  return {
    pokemon: state.pokemons.pokemons
  };
};

//dispatch actions
const mapDispatchToProps = {
  fetchPokemonDetails: pokemonOperations.fetchPokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail);
