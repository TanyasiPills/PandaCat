import React, { useState } from "react";
import {
  Image
} from "react-bootstrap";
import heart from "../../public/heart-regular.svg";
import solidheart from "../../public/heart-solid.svg";
import "./CSS/Gif.css";
import { useNavigate } from "react-router-dom";



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

  const navigator = useNavigate();
  return (
    <div className="gifcontainer card ">
      <Image fluid className="gifem" src={imgsrc1} alt="Can't load the gif"  onClick={() => navigator(`/gif/${singleId}`)}/>
      {favourite1 ? (
        <Image
          onClick={() => {
            setItFav(() => (IsItFav ? false : true));
            {
              if (!IsItFav) {
                fetch("http://localhost:3000" + "/favourites", {
                  method: "POST",
                  headers: {"Content-Type":"application/json"},
                  body: JSON.stringify({
                    url: imgsrc1,
                    id: singleId,
                  }),
                });
              } else {
                fetch("http://localhost:3000" + "/favourites", {
                  method: "DELETE",
                  headers: {"Content-Type":"application/json"},
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
                  headers: {"Content-Type":"application/json"},
                  body: JSON.stringify({
                    url: imgsrc1,
                    id: singleId,
                  }),
                });
              } else {
                fetch("http://localhost:3000" + "/favourites", {
                  method: "DELETE",
                  headers: {"Content-Type":"application/json"},
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
