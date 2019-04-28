import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pokemonOperations } from "../../../state/ducks/pokemons";
import { Container } from "reactstrap";
import {
  PaginationButtons,
  LoadingComponent,
  ListComponent
} from "../../../components";
import "./styles.css";

function Pokemons(props) {
  const { fetchList } = props;
  //isFetching variable works like a loading
  const { isFetching, pokemons } = props.pokemons;

  //master url to get the pokemons
  let masterUrl = "https://pokeapi.co/api/v2/pokemon/?limit=30";
  let pokemonsList = [];
  let nextUrl = masterUrl;
  let prevUrl = "";

  useEffect(() => {
    //if nextUrl and masterUrl are equal, fetch the pokemons
    //this prevents fetching the next pokemons when accessing this view
    if (nextUrl === masterUrl) {
      fetchList(nextUrl);
    }

    //this works as componentWillUnmount, set the original url
    return () => {
      nextUrl = masterUrl;
    };
    //only re-render when nextUrl changes
  }, [nextUrl]);

  //get next pokemons
  function nextPokemons() {
    props.fetchList(nextUrl);
  }

  //get prev pokemons
  function prevPokemons() {
    props.fetchList(prevUrl);
  }

  //if items is loaded, get item list, nextUrl and prevUrl
  if (typeof pokemons !== "undefined") {
    pokemonsList = pokemons.results;
    nextUrl = pokemons.next;
    prevUrl = pokemons.previous;
  }

  return (
    <Container>
      {isFetching && <LoadingComponent text={"Loading pokemons..."} />}
      {!isFetching && <ListComponent type={"pokemons"} list={pokemonsList} />}
      <PaginationButtons
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        prev={prevPokemons}
        next={nextPokemons}
      />
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    pokemons: state.pokemons.pokemons
  };
};

const mapDispatchToProps = {
  fetchList: pokemonOperations.fetchList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemons);
