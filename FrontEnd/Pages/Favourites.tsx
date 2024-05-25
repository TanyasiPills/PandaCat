import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import VantaFog from "../VantaFog";
import { Container } from "react-bootstrap";
import "../Pages/CSS/Container.css"
import MainPageGifContainer from "../Compoments/MainPageGifContainer";

export default function Favourite() {
  return (<>
  <VantaFog/>
    <Container className="maincontainer">
        <MainPageGifContainer onlyFavourites={true} weShallLoadMore={false}/>      
    </Container>
  </>);
}
