//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
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
import "../Compoments/CSS/CopyArea.css"
import { Link, Navigate } from "react-router-dom";

interface Props {
  basesrc: string;
  favourite: boolean;
  bid: string;
}

function Gif({ basesrc, favourite, bid }: Props) {
  const [imgsrc, setImgSrc] = useState(basesrc);

  const handleImgSrc = async (quality: string) => {
    const response = await fetch(`http://localhost:3000/gif/${bid}?quality=${quality}`, {
      method: "GET",
    });
    const data = await response.json();
    setImgSrc(data.url);
  };

  const copyArea = useRef<HTMLSpanElement>(null);

  function CopiedText(event: React.MouseEvent<HTMLImageElement | HTMLInputElement, MouseEvent>) {
    const sp = copyArea.current!;
    sp.className = "show";
    sp.style.left = event.clientX + "px";
    sp.style.top = event.clientY + "px";

    setTimeout(() => {
      sp.className = sp.className.replace("show", "");
    }, 3000);
  }

  return (
    <Container>
      <span id="snackbar" ref={copyArea}>Successfully Copied</span>
      <Col>
        <Row>
          <PageHeader text="Gif" />
        </Row>
        <Row>
          <ReallyScrewedUpSingleGif
            imgsrc1={imgsrc}
            favourite1={favourite}
            singleId={bid}
            myCallbackFunc={() => { }}
          />
        </Row>
        <Row
          className="sharegif"
          style={{ display: "flex", justifyContent: "flex-end", paddingTop: "2vh" }}
        >
          <Col xs={8}>
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="options" defaultValue={2} style={{ textAlign: "center" }}>
                <ToggleButton value={1} id="hd" onClick={() => handleImgSrc("hd")}>
                  HD Gif
                </ToggleButton>
                <ToggleButton value={2} id="sd" onClick={() => handleImgSrc("sd")}>
                  SD Gif
                </ToggleButton>
                <ToggleButton value={3} id="mp4" onClick={() => handleImgSrc("mp4")}>
                  MP4
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col>
            <Image
              src={copy}
              className="shareicon"
              alt="link icon"
              data-clipboard-text={imgsrc}
              style={{ maxWidth: "100%" }}
              onClick={(e) => CopiedText(e)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Share link</h5>
            <Form.Control
              type="text"
              value={window.location.href}
              aria-label={window.location.href}
              data-clipboard-text={window.location.href}
              onClick={(e) => CopiedText(e)}
              readOnly
            />
          </Col>
        </Row>
      </Col>
      <Row>
        <h5>Original Source:</h5>
        <Image
          style={{ maxHeight: "10vh", display: "block", width: "auto", height: "auto" }}
          fluid
          src="../public/TenorLogo.png"
          onClick={() => window.open(`https://tenor.com/hu/view/${bid}`, '_blank')}
          alt="Tenor source"
          aria-label="Tenor src"
        />
      </Row>
    </Container>
  );
}

export default Gif;