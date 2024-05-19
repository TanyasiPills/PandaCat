import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Gif from "../Compoments/Gif";
import TagList from "../Compoments/TagList";

interface SpecificGifProps {
  gifsrc?: string;
  gid?: string;
  giffavourite?: boolean;
  giftaglist?: string[];
}

interface GifData {
  url?: string;
  id?: string;
  favourite?: boolean;
  tags?: string[];
}

async function fetchGifData(
  param: string | undefined,
  isGid: boolean
): Promise<GifData | null> {
  try {
    let response;
    if (isGid) {
      response = await fetch(`http://localhost:3000/gif/${param}`, {
        method: "GET",
      });
    } else {
      response = await fetch(`http://localhost:3000/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: param }),
      });
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: GifData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default function SpecificGif({
  gifsrc: initialGifsrc,
  gid: initialGid,
  giffavourite: initialGiffavourite,
  giftaglist: initialGiftaglist,
}: SpecificGifProps) {
  const [gifData, setGifData] = useState<GifData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data: GifData | null = null;

      if (!initialGifsrc && !initialGid) {
        const gid = window.location.pathname.split("/")[2];
        data = await fetchGifData(gid, true);
      } else if (initialGid) {
        data = await fetchGifData(initialGid, true);
      } else if (initialGifsrc) {
        data = await fetchGifData(initialGifsrc, false);
      }

      if (data) {
        setGifData(data);
        console.log(gifData); //it is null please tell me why
        setLoading(false);
      }
    };  
    fetchData();
  }, [initialGifsrc, initialGid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!gifData) {
    return <Navigate to="/*" />;
  }
  console.log("specifict.tsx1|" + gifData.id);
  return (
    <Container>
      <Gif
        basesrc={gifData.url || ""}
        favourite={gifData.favourite || false}
        bid={gifData.id || ""}
      />
      <TagList
        taglist={gifData.tags || []}
        removable={false}
        callback={() => {}}
      />
    </Container>
  );
}
