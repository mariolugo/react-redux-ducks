import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { itemOperations } from "../../../state/ducks/items";
import { Row, Col, Badge } from "reactstrap";
import { Jumbotron, Container } from "reactstrap";
import getImagePalette from "image-palette-core";
import "./styles.css";

function ItemDefaul(props) {
  const { fetchItemDetails, item } = props;
  const { params } = props.match;
  const { name } = params;
  const { isFetching } = item;
  const itemDetails = item.item;

  //image of pokemon to get its palette
  const image = new Image();
  //the server has "Access-Control-Allow-Origin "*"", so we need to set
  //crossOrigin to Anonymous
  image.crossOrigin = "Anonymous";

  console.log("itemDetails", itemDetails);

  let sprite = "";

  if (typeof itemDetails !== "undefined") {
    sprite = itemDetails.sprites["default"];
  }

  //state variables
  const [img, setImg] = useState();
  const [palette, setPalette] = useState();

  useEffect(() => {
    // if images are undefined, fetch pokemon details once
    // so it will no re-fetch in the re-render
    if (typeof img === "undefined") {
      fetchItemDetails(name);
    }

    // wait until sprite is loaded and palette undefined to get the palette
    if (typeof sprite !== "undefined" && typeof palette === "undefined") {
      image.src = sprite;
      image.onload = function() {
        //set palette state with the getImagePalette function, wait until
        //image is loaded completely
        setPalette(getImagePalette(image));
      };
    }
    //component will only re-render when this variables changes
  }, [img, palette]);

  return (
    <div>
      {isFetching && (
        <Row>
          <Col>
            <p>Loading item details...</p>
          </Col>
        </Row>
      )}
      {!isFetching && typeof itemDetails !== "undefined" && (
        <div>
          <Jumbotron
            className="Pokemon-hero"
            style={{
              backgroundColor:
                typeof palette !== "undefined" ? palette.backgroundColor : ""
            }}
          >
            <Container fluid>
              <img
                src={sprite}
                alt={`${itemDetails.name} image`}
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
        </div>
      )}
    </div>
  );
}

//get the pokemon state and map it to props
const mapStateToProps = state => {
  return {
    item: state.items.items
  };
};

//dispatch actions
const mapDispatchToProps = {
  fetchItemDetails: itemOperations.fetchItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDefaul);
