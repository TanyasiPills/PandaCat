import React from "react";
import ThreeDotsWave from "../Compoments/LoadingPageCompoment/ThreeDotsWave";
import { Container } from "react-bootstrap";

function Loading() {
  return (
    <Container
      style={{ height: "80 vh", alignItems: "center" }}
      className="d-flex flex-column min-vh-100 justify-content-center align-items-center"
    >
      <ThreeDotsWave text="Loading" />
    </Container>
  );
}

export default Loading;
