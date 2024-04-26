import React from "react";
import "./CSS/HearthBeat.css";
import heart from "../../public/heart-regular.svg";
import solidheart from "../../public/heart-solid.svg";
import { Container } from "react-bootstrap";
import Gif from "./Gif";
import TagList from "./TagList";
export default class Akarmi extends React.Component<{ gifsrc: string, giffavourite: boolean, giftaglist : string[] }> {
  render() {
    return (
      <Container>
        <Gif imgsrc={this.props.gifsrc} favourite={this.props.giffavourite}/>
        <TagList taglist={this.props.giftaglist}/>
      </Container>
    ); //<h1 style={{ color: "red" }}>{this.props.text}</h1>;
  }
}
