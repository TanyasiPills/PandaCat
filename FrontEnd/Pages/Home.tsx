import React, { useEffect, useRef, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container, Spinner } from "react-bootstrap";
import MyNavbar from "../Compoments/MyNavbar";
import Testmodule from "../Compoments/Testmodule";
import MainPageGifContainer from "../Compoments/MainPageGifContainer";
import TagList from "../Compoments/TagList";
import { useLocation } from "react-router-dom";
import VantaFog from "../VantaFog";
import "../Pages/CSS/Container.css"

interface Props {
  predefTagList?: string[];
}

export default function Home({ predefTagList }: Props) {
  const [gtaglist, setArrayOfTags] = useState<string[]>(predefTagList || []);
  const location = useLocation();
  const navigatorparams = location.state?.clickedString;

  // Update gtaglist when navigatorparams changes
  useEffect(() => {
    if (navigatorparams && navigatorparams.length > 0 && gtaglist.length === 0) {
      setArrayOfTags([navigatorparams]);
    }
  }, [navigatorparams]);

  const thisFromChildComponent = (value: string[]) => {
    if (JSON.stringify(gtaglist) !== JSON.stringify(value)) {
      setArrayOfTags((prevList) => [...prevList, ...value]);
    }
  };

  const MySearch = (searchQuery: string) => {
    setArrayOfTags((prevList) => [...prevList, searchQuery]);
  };

  return (
    <Container>
      <VantaFog/>
      <MyNavbar onSearch={MySearch} />
      <div className="ActiveTags" style={{ backgroundColor: "#aaa", height: "5vh", marginTop: "8vh" }}>
        {gtaglist.length > 0 && <TagList taglist={gtaglist} removable={true} callback={thisFromChildComponent} />}
      </div>
      <div className="gifs maincontainer" style={{ minHeight: "100vh" }}>
        <MainPageGifContainer taglist={gtaglist}/>
      </div>
    </Container>
  );
}