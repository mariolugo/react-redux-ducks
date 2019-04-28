import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { itemOperations } from "../../../state/ducks/items";
import getImagePalette from "image-palette-core";
import { ItemDetailsComponent, LoadingComponent } from "../../../components";
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
      {isFetching && <LoadingComponent text={"Loading item details..."} />}
      {!isFetching && typeof itemDetails !== "undefined" && (
        <ItemDetailsComponent
          palette={palette}
          setImg={setImg}
          itemDetails={itemDetails}
          sprite={sprite}
        />
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
