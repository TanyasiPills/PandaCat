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
          style={{ display: "flex", justifyContent: "flex-end", paddingTop: "2vh" }}
        >
          <Col xs={8}> {/* Adjust the column size */}
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="options" defaultValue={2} style={{textAlign: "center"}}>
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
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              readOnly
            />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default Gif;