import React, { useEffect, useRef, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container, Spinner } from "react-bootstrap";
import MyNavbar from "../Compoments/MyNavbar";
import Testmodule from "../Compoments/Testmodule";
import MainPageGifContainer from "../Compoments/MainPageGifContainer";
import TagList from "../Compoments/TagList";

interface Props {
  predefTagList?: string[];
}

export default function Home({ predefTagList }: Props) {
  const [gtaglist, setArrayOfTags] = useState(predefTagList || []);

  const thisFromChildComponent = (value: string[]) => {
    if (JSON.stringify(gtaglist) !== JSON.stringify(value)) {
      setArrayOfTags((prevList) => [...prevList, ...value]);
    }
  };

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
        <TagList
          taglist={gtaglist}
          removable={true}
          callback={thisFromChildComponent}
        />
      </div>
      <Testmodule />
      <div className="gifs" style={{ minHeight: "100vh" }}>
        <MainPageGifContainer taglist={gtaglist} />
      </div>
    </Container>
  );
}
