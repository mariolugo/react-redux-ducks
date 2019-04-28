import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle
} from "reactstrap";
import { Link } from "react-router-dom";
import { idFromUrl } from "../../utils";

function List({ list, type }) {
  return (
    <Row className="List-row">
      {list.length > 0 &&
        list.map((item, index) => {
          return (
            <Col key={index} xs="6" sm="6" md="2">
              <Card className="Card">
                {type === 'pokemons' && (
                    <CardImg
                    top
                    width="100%"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idFromUrl(
                      item.url
                    )}.png`}
                    alt={`Pokemon ${item.name} image`}
                  />
                )}
                {type === 'items' && (
                    <CardImg
                    top
                    width="100%"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                    alt={`Item ${item.name} image`}
                  />
                )}
                <CardBody>
                  <CardTitle className="Card-title">{item.name}</CardTitle>
                  <Button
                    tag={Link}
                    to={type === 'pokemons' ?`/pokemon/${item.name}`: `/item/${item.name}`}
                    color="primary"
                  >
                    View Details
                  </Button>
                </CardBody>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
}

List.propTypes = {
  list: PropTypes.array,
  type: PropTypes.oneOf(["pokemons", "items"])
};

export default List;
