import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  FormFeedback,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { Link, Router } from "react-router-dom";
import { validate, asyncValidate } from "../../../utils";
import "./styles.css";

const renderField = ({
  input,
  label,
  type,
  setValue,
  value,
  meta: { asyncValidating, touched, error }
}) => {
  console.log("error", error);

  return (
    <FormGroup>
      <Label>{label}</Label>
      <div className={asyncValidating ? "async-validating" : ""}>
        <Input {...input} invalid={error ? true : false} valid={typeof error === 'undefined' ? true : false} type={type} value={value} placeholder={label} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </div>
    </FormGroup>
  );
};

function Home(props) {
  const { pristine, submitting, onSubmit, history } = props;

  return (
    <Container className="Home">
      <Row className="Buttons-row">
        <Col>
          <h1>Welcome to the Reducks Observable Pokedex!</h1>
          <Button tag={Link} to="/pokemons" color="primary">
            View pokemons
          </Button>{" "}
          <Button tag={Link} to="/items" color="primary">
            View items
          </Button>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2>Simple Redux Form Asynchronous Validation</h2>
          <p>
            Usernames that will <em>fail</em> validation: <code>john</code>,{" "}
            <code>paul</code>, <code>george</code> or <code>ringo</code>.
          </p>
          <form onSubmit={onSubmit}>
            <Field
              name="username"
              type="text"
              component={renderField}
              label="Username"
            />
            <Field
              name="password"
              type="password"
              component={renderField}
              label="Password"
            />
            <div>
              <Button type="submit" disabled={submitting}>
                "Sign Up"
              </Button>{" "}
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

Home.defaultProps = {
  onSubmit: async function showResults(e) {
    e.preventDefault();
  }
};

export default reduxForm({
  form: "asyncValidation", // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: ["username"]
})(Home);
