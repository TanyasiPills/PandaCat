import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
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

async function fetchGifData(param: string | undefined, isGid: boolean): Promise<GifData | null> {
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
      return null;
    }

    const data: GifData = await response.json();
    if (!data) {
      return null;
    }

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
}: SpecificGifProps)
: React.ReactNode {
  const [gifData, setGifData] = useState<GifData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
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
      } else {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [initialGifsrc, initialGid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !gifData) {
    navigate("/*",{state:{error: "404"}});
    return;
  }

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
