import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import ReallyScrewedUpSingleGif from "../Compoments/ReallyScrewedUpSingleGif";
import { Navigate } from "react-router-dom";
import Gif from "../Compoments/Gif";
import TagList from "../Compoments/TagList";

interface SpecifictgifProps {
  gifsrc?: string;
  gid?: string;
  gfav?: boolean;
  giffavourite: boolean;
  giftaglist?: string[];
}

export default function Specifictgif({
  gifsrc,
  gid,
  gfav,
  giffavourite,
  giftaglist,
}: SpecifictgifProps) {
  if (!gifsrc) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Gif basesrc={gifsrc} favourite={giffavourite} bid={gid || ""} />
      <TagList taglist={giftaglist || []} removable={false} />
    </Container>
  );
}
