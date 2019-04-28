import React from "react";
import { Row, Col } from "reactstrap";
import PropTypes from 'prop-types'

function Loading({ text }) {
  return (
    <Row>
      <Col>
        <p>{text}</p>
      </Col>
    </Row>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
