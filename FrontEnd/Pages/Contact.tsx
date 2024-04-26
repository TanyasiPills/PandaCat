import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import PageHeader from "../Compoments/PageHeader";
import { motion } from "framer-motion";

export default class Contact extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Container>
          <Row>
            <PageHeader text="Contact" />
          </Row>
          <Row>
            <Col>
              <motion.div
                className="card"
                initial={{
                  opacity: 0,
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1,
                  },
                }}
                viewport={{ once: true }}
              >
                <p>
                  This is a professionally homemade website. A small group of students made the best gifsharing website by THEMESELFs. It's totaly not based on any other websites and it is 100% original idea.
                  Just kidding, all the credit to <a href="https://tenor.com/hu/"> Tenor</a> for the API.
                  Also we used the following Js Libraries:
                  Vite
                  React
                  Bootstrap
                </p>
              </motion.div>
            </Col>
            <Col>
              <img></img>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
