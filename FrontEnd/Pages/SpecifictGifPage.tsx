import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import SpecifictGif from "../Compoments/SpecifictGif";

export default class Specifictgif extends React.Component {
  render(): React.ReactNode {
    return (<Container>
      <SpecifictGif gifsrc="https://c.tenor.com/LadCBLn5HDQAAAAC/tenor.gif" giffavourite={false} giftaglist={["valami","akarmi"]}></SpecifictGif>
    </Container>);
  }
}
