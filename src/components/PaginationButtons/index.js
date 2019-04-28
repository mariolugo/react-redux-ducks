import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "reactstrap";

function PaginationButtons({ prevUrl, nextUrl, prev, next }) {
  return (
    <Row className="Buttons-row">
      <Col>
        {prevUrl !== "" &&
          typeof prevUrl !== "undefined" &&
          prevUrl !== null && (
            <Button color="primary" onClick={prev}>
              Get prev
            </Button>
          )}{" "}
        <Button color="primary" onClick={next}>
          Get next
        </Button>
      </Col>
    </Row>
  );
}

PaginationButtons.propTypes = {
  prevUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  prev: PropTypes.func,
  next: PropTypes.func
};

export default PaginationButtons;
