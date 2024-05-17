import React, { useState, useEffect, useRef } from "react";
import ReallyScrewedUpSingleGif from "./ReallyScrewedUpSingleGif";
import WWidht from "../Compoments/WindowWidht";
import { Container, Spinner } from "react-bootstrap";

export default function GifContainer({ taglist }: { taglist?: string[] }) {
  const myRef = useRef<HTMLDivElement>(null);
  const [myElementIsVisible, setMyElementIsVisible] = useState(false);
  const [giflist, setGiflist] = useState<
    { url: string; id: string; favourite: boolean }[]
  >([]);
  const [tagKey, setTagKey] = useState(false);
  let myKey: string | undefined;
  let windowWidht = Math.ceil(WWidht[0]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setMyElementIsVisible(entry.isIntersecting);
      if (entry.isIntersecting) {
        if (taglist != null) {
          setTagKey(false);
          fetchGifs("localhost:3000/popular");
        } else {
          setTagKey(true);
          fetchGifs("localhost:3000/search", taglist);
        }
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
  }, [taglist]);

  const fetchGifs = async (url: string, searchstr?: string[]) => {
    const response = await fetch(url, {
      method: "GET",
      body: JSON.stringify({ key: myKey, q: searchstr }),
    });
    const data = await response.json();
    setGiflist((prevList) => [...prevList, ...data.gifs]);
    myKey = data.key;
  };

  useEffect(() => {
    if (taglist != null) {
      setTagKey(false);
      fetchGifs("localhost:3000/popular");
    } else {
      setTagKey(true);
      fetchGifs("localhost:3000/search", taglist);
    }
  }, [taglist]);

  return (
    <Container>
      {giflist.map((x) => (
        <ReallyScrewedUpSingleGif
          imgsrc1={x.url}
          singleId={x.id}
          favourite1={x.favourite}
          key={x.id} 
        />
      ))}
      <div
        ref={myRef}
        id="spinnispinner"
        className="d-flex justify-content-center"
        style={{ visibility: myElementIsVisible ? "visible" : "hidden" }}
      >
        <Spinner />
      </div>
    </Container>
  );
}
