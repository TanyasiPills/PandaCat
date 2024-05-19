import React, {
  useState,
  useEffect,
  useRef,
  useTransition,
  Suspense,
} from "react";
import ReallyScrewedUpSingleGif from "./ReallyScrewedUpSingleGif";
import WWidht from "../Compoments/WindowWidht";
import { Container, Spinner } from "react-bootstrap";

export default function GifContainer({ taglist }: { taglist?: string[] }) {
  const [isPending, startTransition] = useTransition();

  const myRef = useRef<HTMLDivElement>(null);
  const [myElementIsVisible, setMyElementIsVisible] = useState(false);
  const [giflist, setGiflist] = useState<
    { url: string; id: string; favourite: boolean }[]
  >([]);
  const [myKey, setMyKey] = useState<string | undefined>(undefined);
  var windowWidht = Math.ceil(WWidht[0] / 500);

  //debug undifined call param homepage taglist - search  - taglist

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setMyElementIsVisible(entry.isIntersecting);
      if (entry.isIntersecting) {
        startTransition(() => {
          fetchGifs(
            taglist === undefined || taglist === null
              ? "http://localhost:3000/search"
              : "http://localhost:3000/popular",
            taglist
          );
        });
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
  }, [taglist, startTransition]);

  const fetchGifs = async (url: string, searchstr?: string[]) => {
    let tmp = {};
    if (myKey != undefined) tmp["key"] = myKey;
    if (searchstr != undefined) tmp["q"] = searchstr?.join("");
    console.log(url);
    const response = await fetch(url + "?" + new URLSearchParams(tmp));
    const data = await response.json();
    setGiflist((prevList) => [...prevList, ...data.gifs]);
    setMyKey(data.key);
  };

  useEffect(() => {
    setGiflist([]); // Clear giflist when taglist changes
    setMyKey(undefined); // Reset key when taglist changes
    startTransition(() => {
      fetchGifs(
        taglist === undefined || taglist === null
          ? "http://localhost:3000/search"
          : "http://localhost:3000/popular",
        taglist
      );
    });
  }, [taglist, startTransition]);

  return (
    <Container>
      <Suspense fallback={<Spinner />}>
        {giflist.map((x) => (
          <ReallyScrewedUpSingleGif
            imgsrc1={x.url}
            singleId={x.id}
            favourite1={x.favourite}
            key={x.id}
          />
        ))}
      </Suspense>
    </Container>
  );
}
/*<div
        ref={myRef}
        id="spinnispinner"
        className="d-flex justify-content-center"
        style={{ visibility: myElementIsVisible ? "visible" : "hidden" }}
      >
        <Spinner />
      </div>*/
