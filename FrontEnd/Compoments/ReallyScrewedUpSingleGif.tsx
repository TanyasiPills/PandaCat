import React, { useState } from "react";
import { ButtonToolbar, Col, Container, Form, Image, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import PageHeader from "./PageHeader";
import heart from "../../public/heart-regular.svg";
import solidheart from "../../public/heart-solid.svg";
import "./CSS/Gif.css"
export default function FuckedUp(imgsrc1: any, favourite1:boolean) {
    const [IsItFav, setItFav] = useState(favourite1);
    return (
        <div className="gifcontainer card ">
            <Image fluid className="gifem" src={imgsrc1} alt="Can't load the gif" />
            {favourite1 ? (
                <Image
                    onClick={() => { setItFav(IsItFav ? false : true) }}
                    fluid
                    className="plus-image heart"
                    src={IsItFav ? solidheart : heart}
                    alt="Can't be loaded"
                />
            ) : (
                <Image
                    onClick={() => { setItFav(IsItFav ? false : true) }}
                    className="plus-image heart"
                    fluid
                    src={IsItFav ? solidheart : heart}
                    alt="Can't be loaded"
                />
            )}
        </div>)
}