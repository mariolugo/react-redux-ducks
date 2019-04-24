import React, { useEffect, useState } from "react";
import logo from "../../../logo.svg";
import { connect } from "react-redux";
import { listOperations } from "../../../state/ducks/list";
import "./styles.css";

function Home(props) {
  console.log("props", props);
  let { list } = props;

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
    <div className="App">
      <header className="App-header">
        {pokemons.length > 0 &&
          pokemons.map((pokemon, index) => {
            return (
              <div key={index}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`}
                  crossOrigin="anonymous"
                  id="sp"
                />
                <p>{pokemon.name}</p>
              </div>
            );
          })}
        <button onClick={nextPokemons}>Get next</button>
        {prevUrl !== "" &&
          typeof prevUrl !== "undefined" &&
          prevUrl !== null && <button onClick={prevPokemons}>Get prev</button>}
      </header>
    </div>
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
