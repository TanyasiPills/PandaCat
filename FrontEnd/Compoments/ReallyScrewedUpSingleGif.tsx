import React, { useState } from "react";
import {
  ButtonToolbar,
  Col,
  Container,
  Form,
  Image,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import PageHeader from "./PageHeader";
import heart from "../../public/heart-regular.svg";
import solidheart from "../../public/heart-solid.svg";
import "./CSS/Gif.css";
import { json } from "react-router-dom";
export default function ReallyScrewedUpSingleGif(
  {imgsrc1,
  singleId,
  favourite1}: {imgsrc1: any,singleId: any, favourite1: any}
) {
  const [IsItFav, setItFav] = useState(favourite1);

  const tags = fetch("localhost:3000" + "/" + imgsrc1, {
    method: "GET",
  });

  return (
    <div className="gifcontainer card ">
      <Image fluid className="gifem" src={imgsrc1} alt="Can't load the gif" />
      {favourite1 ? (
        <Image
          onClick={() => {
            setItFav(() => (IsItFav ? false : true));
            {
              if (!IsItFav) {
                fetch("localhost:3000" + "/favourites", {
                  method: "POST",
                  body: JSON.stringify({
                    url: imgsrc1,
                  }),
                });
              } else {
                fetch("localhost:3000" + "/favourites", {
                  method: "DELETE",
                  body: JSON.stringify({
                    url: imgsrc1,
                  }),
                });
              }
            }
          }}
          fluid
          className="plus-image heart"
          src={IsItFav ? solidheart : heart}
          alt="Can't be loaded"
        />
      ) : (
        <Image
          onClick={() => {
            setItFav(() => (IsItFav ? false : true));
            {
              if (!IsItFav) {
                fetch("localhost:3000" + "/favourites", {
                  method: "POST",
                  body: JSON.stringify({
                    url: imgsrc1,
                    tags: tags,
                  }),
                });
              } else {
                fetch("localhost:3000" + "/favourites", {
                  method: "DELETE",
                  body: JSON.stringify({
                    url: imgsrc1,
                  }),
                });
              }
            }
          }}
          className="plus-image heart"
          fluid
          src={IsItFav ? solidheart : heart}
          alt="Can't be loaded"
        />
      )}
    </div>
  );
}
