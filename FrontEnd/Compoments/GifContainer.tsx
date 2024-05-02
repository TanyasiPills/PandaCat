import React from "react";
import "./CSS/HearthBeat.css";
import { Container, Image } from "react-bootstrap";
import PageHeader from "./PageHeader";
import Gif from "../Compoments/Gif"
export default class Akarmi extends React.Component<{ imgsrc: string, favourite: boolean }> {
  render() {
    
    return (
      <Container>
        {/*
        [["link",false],["link",false],["link",false]].map((x,i)=>{
            <Gif imgsrc={x[0]} favourite={x[1]}/>
        })*/}
      </Container>
    ); 
  }
}
