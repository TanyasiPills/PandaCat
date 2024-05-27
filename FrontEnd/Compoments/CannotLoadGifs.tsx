import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import PageHeader from "./PageHeader";

function SadPanda() {
    const [sadPanda, setPanda] = useState<string>("");
    useEffect(() => {
        fetch(`http://localhost:3000/gif/13270957`, {
            method: "GET",
        }).
            then(x => x.json()).then(x => setPanda(x.url));
    }, []);
    return (
        <div>
            <Row>
                <Col>
                    <PageHeader text="It's looks like we can't load any gifs here" />
                </Col>
                <Col>
                    <Image fluid src={sadPanda} aria-label="SadPanda" alt="Can't load sad panda gif :sob:" />
                </Col>
            </Row>
        </div>
    );
}

export default SadPanda;