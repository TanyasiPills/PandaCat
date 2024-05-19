import React from "react";
import { Container } from "react-bootstrap";

function Loading() {
  return (
    <Container
      style={{ height: "80 vh", alignItems: "center" }}
      className="d-flex flex-column min-vh-100 justify-content-center align-items-center"
    ></Container>
  );
}

export default Loading;
