import React, { useEffect, useRef, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container, Spinner } from "react-bootstrap";
import MyNavbar from "../Compoments/MyNavbar";
import Testmodule from "../Compoments/Testmodule";
import MainPageGifContainer from "../Compoments/MainPageGifContainer";

export default function Home(predefTagList?: string[]) {
  const [gtaglist, setArrayOfTags] = useState([]);

  return (
    <Container>
      <MyNavbar />
      <div
        className="head"
        style={{ backgroundColor: "red", height: "30vh" }}
      ></div>
      <div
        className="ActiveTags"
        style={{ backgroundColor: "blue", height: "5vh" }}
      >
        <div className="Searchbar"></div>
      </div>
      <Testmodule />
      <div className="gifs" style={{ minHeight: "100vh" }}>
        <MainPageGifContainer taglist={gtaglist} />
      </div>
    </Container>
  );
}
