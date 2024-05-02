import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import panda from "../../public/Panda.png";
import "./CSS/PageNotFound.css"
import PageHeader from "../Compoments/PageHeader";
export default class PageNotFound extends React.Component {
  render(): React.ReactNode {
    return (
      <Container style={{ marginTop: "8vh" }}>
        <div className="circle  ratio ratio-1x1">
          <div className=" center d-flex flex-grow-1 justify-content-center align-items-center">
            <PageHeader text="ERROR 404"/><br/>
            <PageHeader text="PAGE NOT FOUND"/>
          </div>
        </div>
      </Container>
    );
  }
}
