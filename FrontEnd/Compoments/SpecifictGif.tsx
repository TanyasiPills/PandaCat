import React from "react";
import "./CSS/SpecifictGif.css";
import heart from "../../public/heart-regular.svg";
import solidheart from "../../public/heart-solid.svg";
import { Container } from "react-bootstrap";
import Gif from "./Gif";
import TagList from "./TagList";
import { Navigate, redirect } from "react-router-dom"
export default class Akarmi extends React.Component<{ gifsrc: string | null, giffavourite: boolean, giftaglist: string[] }> {

  render() {
    if (this.props.gifsrc === null) {
      return <Navigate to='/somewhereNotHere' />
      //redirect("/*")
      //<Navigate to='/somewhereNotHere' />
    }


    return (
      <Container>
        <Gif basesrc={this.props.gifsrc!} favourite={this.props.giffavourite} />
        <TagList taglist={this.props.giftaglist} removable={false} />
      </Container>
    );
  }
}
