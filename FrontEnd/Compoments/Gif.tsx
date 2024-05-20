import React, { useState } from "react";
import {
  ButtonToolbar,
  Col,
  Container,
  Form,
  Image,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import PageHeader from "./PageHeader";
import copy from "../../public/copy_link.png";
import "./CSS/Gif.css";
import ReallyScrewedUpSingleGif from "../Compoments/ReallyScrewedUpSingleGif";

function Akarmi({
  basesrc,
  favourite,
  bid,
}: {
  basesrc: string;
  favourite: boolean;
  bid: string;
}) {
  const [imgsrc, setImgSrc] = useState(basesrc);
  console.log("Gif.tsx|"+bid);
  const handleImgSrc = async (paramImg: string) => {
    var newImgSrc;
    await fetch(`http://localhost:3000/gif/${bid}?`+new URLSearchParams(paramImg), {
      method: "GET",
    })
      .then((x) => x.json())
      .then((x) => (newImgSrc = x.url));
  /*
  const handleImgSrc = async (paramImg: string) => {
    const newImgSrc = await fetch(`http://localhost:3000/gif/${bid}`, {
      method: "POST",
      body: JSON.stringlify(
        size: paramImg
      )
    });
*/
    setImgSrc(newImgSrc);
  };

  return (
    <Container>
      <Col>
        <Row>
          <PageHeader text="Gif" />
        </Row>
        <Row>
          <ReallyScrewedUpSingleGif
            imgsrc1={imgsrc}
            favourite1={favourite}
            singleId={bid}
          />
        </Row>
        <Row
          className="sharegif"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton
                value={1}
                id={"hd"}
                onChange={() => handleImgSrc("1")}
                checked={false}
              >
                HD Gif
              </ToggleButton>
              <ToggleButton
                value={2}
                id={"sd"}
                onChange={() => handleImgSrc("2")}
                checked 
              >
                SD Gif 2
              </ToggleButton>
              <ToggleButton
                value={3}
                id={"mp"}
                onChange={() => handleImgSrc("3")}
              >
                MP4
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          <Image
            src={copy}
            className="shareicon"
            alt="link icon"
            data-clipboard-text={imgsrc}
          />
        </Row>
        <Row>
          <h5>Share link</h5>
          <Form.Control
            type="text"
            placeholder="Disabled readonly input"
            value={window.location.href}
            aria-label={window.location.href}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            readOnly
          />
        </Row>
      </Col>
    </Container>
  );
}

export default Akarmi;
