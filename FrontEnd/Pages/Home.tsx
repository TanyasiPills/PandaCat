import React, { useEffect, useRef, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container, Spinner } from "react-bootstrap";
import MyNavbar from "../Compoments/MyNavbar";
import Testmodule from "../Compoments/Testmodule";
import ReallyScrewedUpSingleGif from "../Compoments/ReallyScrewedUpSingleGif";
import WWidht from "../Compoments/WindowWidht"
import MainPageGifContainer from "../Compoments/MainPageGifContainer"

export default function Home(predefTagList?:string[]) {
  const myRef = useRef<HTMLDivElement>(null);
  const [myElementIsVisible, setMyElementIsVisible] = useState(false);
  const [arrayOfGiffies, setArrayOfGiffies] = useState<string[]>([]);

  let windowWidht = Math.ceil( WWidht[0]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setMyElementIsVisible(entry.isIntersecting);
      console.log(entry.isIntersecting + " 1");
      if (entry.isIntersecting) {
        // Fetch extra gifs
        setArrayOfGiffies((prevArray) => [...prevArray, "new gif"]); // Add your fetched gifs here
      }
    });

    if (myRef.current) {
      observer.observe(myRef.current);
    }

    return () => {
      if (myRef.current) {
        observer.unobserve(myRef.current);
      }
    };
  }, []);

  return (
    <Container>
      <MyNavbar />
      <div className="head" style={{ backgroundColor: "red", height: "30vh" }}></div>
      <div className="ActiveTags" style={{ backgroundColor: "blue", height: "5vh" }}>
        <div className="Searchbar"></div>
      </div>
      <Testmodule />
      <div className="gifs" style={{ minHeight: "100vh" }}>
        <MainPageGifContainer gifArray={arrayOfGiffies}/>
      </div>
      <div ref={myRef} id="spinnispinner" className="d-flex justify-content-center" style={{ visibility: myElementIsVisible ? "visible" : "hidden" }}>
        <Spinner />
      </div>
    </Container>
  );
}
