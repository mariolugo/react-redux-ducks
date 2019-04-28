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
  CardTitle,
} from "reactstrap";
import {Link} from "react-router-dom";
import "./styles.css";

function Items(props) {

  const { fetchList } = props;
  //isFetching variable works like a loading
  const { isFetching, items } = props.items;

  //master url of the items
  let masterUrl = "http://pokeapi.co/api/v2/item/?limit=30"
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
    }
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
      {isFetching && (
        <Row>
          <Col>
            <p>Loading items...</p>
          </Col>
        </Row>
      )}
      {!isFetching && (
        <Row className="Item-list-row">
          {itemsList.length > 0 &&
            itemsList.map((item, index) => {
              return (
                <Col key={index} xs="6" sm="6" md="2">
                  <Card className="Card">
                    <CardImg
                      top
                      width="100%"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                      alt={`Item ${item.name} image`}
                    />
                    <CardBody>
                      <CardTitle className="Card-title">{item.name}</CardTitle>
                      <Button tag={Link} to={`/item/${item.name}`} color="primary">View Details</Button>
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
              <Button color="primary" onClick={prevItems}>
                Get prev
              </Button>
            )}{" "}
          <Button color="primary" onClick={nextItems}>
            Get next
          </Button>
        </Col>
      </Row>
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
