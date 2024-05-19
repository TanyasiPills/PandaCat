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

interface Props {
  imgsrc1: string;
  singleId: string;
  favourite1: boolean;
}

export default function ReallyScrewedUpSingleGif({
  imgsrc1,
  singleId,
  favourite1,
}: Props) {
  const [IsItFav, setItFav] = useState(favourite1);

  return (
    <div className="gifcontainer card ">
      <Image fluid className="gifem" src={imgsrc1} alt="Can't load the gif" />
      {favourite1 ? (
        <Image
          onClick={() => {
            setItFav(() => (IsItFav ? false : true));
            {
              if (!IsItFav) {
                fetch("http://localhost:3000" + "/favourites", {
                  method: "POST",
                  body: JSON.stringify({
                    url: imgsrc1,
                    id: singleId,
                  }),
                });
              } else {
                fetch("http://localhost:3000" + "/favourites", {
                  method: "DELETE",
                  body: JSON.stringify({
                    id: singleId,
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
                fetch("http://localhost:3000" + "/favourites", {
                  method: "POST",
                  body: JSON.stringify({
                    url: imgsrc1,
                    id: singleId,
                  }),
                });
              } else {
                fetch("http://localhost:3000" + "/favourites", {
                  method: "DELETE",
                  body: JSON.stringify({
                    id: singleId,
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
