import React, { useEffect, useRef, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container, Spinner } from "react-bootstrap";
import MyNavbar from "../Compoments/MyNavbar";
import Testmodule from "../Compoments/Testmodule";
import MainPageGifContainer from "../Compoments/MainPageGifContainer";
import TagList from "../Compoments/TagList";
import { useLocation } from "react-router-dom";

interface Props {
  predefTagList?: string[];
}

export default function Home({ predefTagList }: Props) {
  const [gtaglist, setArrayOfTags] = useState<string[]>(predefTagList || []);

  const thisFromChildComponent = (value: string[]) => {
    if (JSON.stringify(gtaglist) !== JSON.stringify(value)) {
      setArrayOfTags((prevList) => [...prevList, ...value]);
    }
  };

  const MySearch = (searchQuery: string) => {
    setArrayOfTags((prevList) => [...prevList, searchQuery]);
  };

  // Check if there are predefined tags or if tags are provided via location state
  const location = useLocation();
  const navigatorparams = location.state?.taglist;
  if (navigatorparams && navigatorparams.length > 0 && gtaglist.length === 0) {
    setArrayOfTags(navigatorparams);
  }

  return (
    <Container>
      <MyNavbar onSearch={MySearch} />
      <div className="head" style={{ backgroundColor: "red", height: "30vh" }}></div>
      <div className="ActiveTags" style={{ backgroundColor: "blue", height: "5vh" }}>
        {gtaglist.length > 0 && <TagList taglist={gtaglist} removable={true} callback={thisFromChildComponent} />}
      </div>
      <Testmodule />
      <div className="gifs" style={{ minHeight: "100vh" }}>
        <MainPageGifContainer taglist={gtaglist} />
      </div>
    </Container>
  );
}