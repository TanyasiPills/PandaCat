import React, {
  useState,
  useEffect,
  useRef,
  useTransition,
  Suspense,
} from "react";
import ReallyScrewedUpSingleGif from "./ReallyScrewedUpSingleGif";
import { Col, Container, Row, Spinner } from "react-bootstrap";

interface Gif {
  url: string;
  id: string;
  favourite: boolean;
}

export default function GifContainer({ taglist }: { taglist?: string[] }) {
  const [isPending, startTransition] = useTransition();
  const myRef = useRef<HTMLDivElement>(null);
  const [myElementIsVisible, setMyElementIsVisible] = useState(false);
  const [giflist, setGiflist] = useState<Gif[]>([]);
  const [myKey, setMyKey] = useState<string | undefined>(undefined);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setMyElementIsVisible(true);
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
    try {
      const params: Record<string, string> = {};
      if (myKey) params["key"] = myKey;
      if (searchstr) params["q"] = searchstr.join(",");

      console.log(params.key+ myKey)
      const response = await fetch(url + "?" + new URLSearchParams(params));
      const data = await response.json();

      setGiflist((prevList) => [...prevList, ...data.gifs]);
      console.log(data.key+"||data.key");
      setMyKey((myKey)=> (data.key));
      console.log(myKey);
    } catch (error) {
      console.error("Error fetching gifs:", error);
    }
  };
/*
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
*/
  return (
    <Container>
      <Suspense fallback={<Spinner />}>
        <Row>
          {giflist.map((gif) => (
            <Col key={gif.id} xs={12} md={4}>
              <ReallyScrewedUpSingleGif
                imgsrc1={gif.url}
                singleId={gif.id}
                favourite1={gif.favourite}
              />
            </Col>
          ))}
        </Row>
      </Suspense>
      <div ref={myRef} id="spinnispinner" className="d-flex justify-content-center">
        {myElementIsVisible && <Spinner />}
      </div>
    </Container>
  );
}