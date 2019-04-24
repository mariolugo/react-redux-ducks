import React, { useEffect } from "react";
import logo from "../../../logo.svg";
import { connect } from "react-redux";
import { listOperations } from "../../../state/ducks/home";
import "./styles.css";

function Home(props) {
  console.log("props", props);

  let { counter } = props;

  useEffect(() => {}, [counter]);

  function click() {
    props.fetchList(counter);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={click}>Click {counter}</button>
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    counter: state.home.list.counter
  };
};

const mapDispatchToProps = {
  fetchList: listOperations.fetchList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
