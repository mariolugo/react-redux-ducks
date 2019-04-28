import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Badge, Jumbotron, Container, Table } from "reactstrap";

function ItemDetails({ palette, setImg, itemDetails, sprite }) {
  return (
    <div>
      <Jumbotron
        className="Item-hero"
        style={{
          backgroundColor:
            typeof palette !== "undefined" ? palette.backgroundColor : ""
        }}
      >
        <Container fluid>
          <img
            src={sprite}
            className="Item-image"
            ref={img => {
              setImg(img);
            }}
          />
          <h1
            className="Item-name"
            style={{
              color: typeof palette !== "undefined" ? palette.color : ""
            }}
          >
            {itemDetails.name}
          </h1>
          <h3>
            <span>
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
                {itemDetails.category.name}
              </Badge>{" "}
            </span>
          </h3>
        </Container>
      </Jumbotron>
      <Container>
        <Row className="Item-row">
          <Col xs="12" sm="12">
            <h3 className="Item-att-title">Cost </h3>
            <h5 className="Item-att-title">{itemDetails.cost}</h5>
          </Col>
        </Row>
        <Row className="Item-row">
          <Col xs="12" sm="12">
            <h3 className="Item-att-title">Attributes</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {itemDetails.attributes.map((attribute, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{attribute.name}</td>
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

ItemDetails.propTypes = {
  palette: PropTypes.object,
  setImg: PropTypes.func,
  itemDetails: PropTypes.object,
  sprite: PropTypes.string
};

export default ItemDetails;
