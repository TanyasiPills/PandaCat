import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import MyNavbar from "../Compoments/MyNavbar";

export default class Home extends React.Component {
  render(): React.ReactNode {
    return (
      <Container>
        <MyNavbar />
        <div className="head" style={{backgroundColor:"red", height:"30vh"}}>
        </div>
        <div className="ActiveTags" style={{backgroundColor:"blue", height:"5vh"}}>
          <div className="Searchbar"></div>
        </div>
        <div className="gifs" style={{height:"100vh"}}></div>
      </Container>
    );
  }
}
