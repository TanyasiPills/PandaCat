import React, { useState } from "react";
import { ButtonToolbar, Col, Container, Form, Image, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import PageHeader from "./PageHeader";
import heart from "../../public/heart-regular.svg";
import solidheart from "../../public/heart-solid.svg";
import copy from "../../public/copy_link.png";
import "./CSS/Gif.css";
import ReallyScrewedUpSingleGif from "../Compoments/ReallyScrewedUpSingleGif";

function Akarmi({ basesrc, favourite, bid }: { basesrc: string; favourite: boolean ,bid:string }) {
  const [imgsrc, setImgSrc] = useState(basesrc);

  const handleImgSrc = (newImgSrc: string) => {
    setImgSrc(newImgSrc);
  };

  return (
    <Container>
      <Col>
        <Row><PageHeader text="Gif" /></Row>
        <Row>
          <ReallyScrewedUpSingleGif imgsrc1={imgsrc} favourite1={favourite} singleId={bid}/>
        </Row>
        <Row className="sharegif" style={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1} id={"hd"} onChange={() => handleImgSrc("hd")}>HD Gif</ToggleButton>
              <ToggleButton value={2} id={"sd"} onChange={() => handleImgSrc("sd")}>SD Gif 2</ToggleButton>
              <ToggleButton value={3} id={"mp"} onChange={() => handleImgSrc("mp")}>MP4</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          <Image src={copy} className="shareicon" alt="link icon" data-clipboard-text={imgsrc} />
        </Row>
        <Row>
          <h5>Share link</h5>
          <Form.Control type="text" placeholder="Disabled readonly input" value={window.location.href} aria-label={window.location.href} onClick={() => { navigator.clipboard.writeText(window.location.href) }} readOnly />
        </Row>
      </Col>
    </Container>
  );
}

export default Akarmi;
