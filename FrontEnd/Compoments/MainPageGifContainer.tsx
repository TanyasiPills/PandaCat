import React from "react";
import ReallyScrewedUpSingleGif from "./ReallyScrewedUpSingleGif";

interface GifContainerProps {
  gifArray: string[];
}

const GifContainer: React.FC<GifContainerProps> = ({ gifArray }) => {
  return (
    <>
      {gifArray.map((x: string, i: number) => (
        <ReallyScrewedUpSingleGif basesrc={x} key={i} favourite={false} />
      ))}
    </>
  );
};

export default GifContainer;
