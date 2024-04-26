import React from "react";
import "./CSS/HearthBeat.css";
import heart from "../../public/heart-regular.svg";
import solidheart from "../../public/heart-solid.svg";
import { Container, Image } from "react-bootstrap";
import PageHeader from "./PageHeader";
export default class Akarmi extends React.Component<{ imgsrc: string, favourite: boolean }> {
  render() {
    return (
      <Container>
        <PageHeader text="ds"/>
        <div className="gifcontainer card">
          <Image fluid src={this.props.imgsrc} alt="Can't load the gif" />
          {this.props.favourite ? <Image className="hearthtest" fluid src={solidheart} alt="Can't be loaded"/> : <Image className="hearthtest" fluid src={heart} alt="Can't be loaded"/>}
        </div>
      </Container>
    ); 
  }
}
