import React, { useEffect } from "react";
import { connect } from "react-redux";
import { itemOperations } from "../../../state/ducks/items";
import {
  Row,
  Col,
  Container,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle
} from "reactstrap";
import {
  PaginationButtons,
  LoadingComponent,
  ListComponent
} from "../../../components";
import { Link } from "react-router-dom";
import "./styles.css";

function Items(props) {
  const { fetchList } = props;
  //isFetching variable works like a loading
  const { isFetching, items } = props.items;

  //master url of the items
  let masterUrl = "http://pokeapi.co/api/v2/item/?limit=30";
  let itemsList = [];
  let nextUrl = masterUrl;
  let prevUrl = "";

  useEffect(() => {
    //if nextUrl and masterUrl are equal, fetch the items
    //this prevents fetching the next items when accessing this view
    if (nextUrl === masterUrl) {
      fetchList(nextUrl);
    }
    //this works as componentWillUnmount, set the original url
    return () => {
      nextUrl = masterUrl;
    };
  }, [nextUrl]);

  //get next items
  function nextItems() {
    props.fetchList(nextUrl);
  }

  //get prev items
  function prevItems() {
    props.fetchList(prevUrl);
  }

  //if items is loaded, get item list, nextUrl and prevUrl
  if (typeof items !== "undefined") {
    itemsList = items.results;
    nextUrl = items.next;
    prevUrl = items.previous;
  }

  return (
    <Container>
      {isFetching && <LoadingComponent text={"Loading items..."} />}
      {!isFetching && <ListComponent type={"items"} list={itemsList} />}
      <PaginationButtons
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        prev={prevItems}
        next={nextItems}
      />
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    items: state.items.items
  };
};

const mapDispatchToProps = {
  fetchList: itemOperations.fetchList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
