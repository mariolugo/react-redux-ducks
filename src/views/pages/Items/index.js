import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listOperations } from "../../../state/ducks/items";
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

function Items(props) {

  const { fetchList } = props;
  const { isFetching, items } = props.items;

  let itemsList = [];
  let nextUrl = "http://pokeapi.co/api/v2/item/?limit=30";
  let prevUrl = "";

  useEffect(() => {
    fetchList(nextUrl);

    //this works as componentWillUnmount, set the original url
    return () => {
      nextUrl = "http://pokeapi.co/api/v2/item/?limit=30";
    }
  }, [nextUrl]);

  function nextItems() {
    props.fetchList(nextUrl);
  }

  function prevItems() {
    props.fetchList(prevUrl);
  }

  if (typeof items !== "undefined") {
    itemsList = items.results;
    nextUrl = items.next;
    prevUrl = items.previous;
  }

  return (
    <React.Fragment>
      {isFetching && (
        <Row>
          <Col>
            <p>Loading items...</p>
          </Col>
        </Row>
      )}
      {!isFetching && (
        <Row className="Pokemon-list-row">
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
              <Button color="primary" onClick={prevItems}>
                Get prev
              </Button>
            )}{" "}
          <Button color="primary" onClick={nextItems}>
            Get next
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    items: state.items.items
  };
};

const mapDispatchToProps = {
  fetchList: listOperations.fetchList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
