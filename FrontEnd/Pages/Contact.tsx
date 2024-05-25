import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import { Col, Container, Row, Image } from "react-bootstrap";
import PageHeader from "../Compoments/PageHeader";
import { motion } from "framer-motion";
import "./CSS/Contact.css"
import "../Pages/CSS/Container.css"
import VantaFog from ".././VantaFog"


export default class Contact extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <VantaFog/>
        <Container className="maincontainer">
          <Row style={{textAlign: "center", marginTop: "2vh",marginBottom: "4vh"}}>
            <PageHeader text="Contact"/>
          </Row>
          <Row>
            <Col style={{marginRight:"2vh", marginLeft:"2vh"}}>
              <motion.div

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
            <Col style={{marginRight: "2vh"}}>
              <div className="rightimg">
                <Image fluid src="../public/Tenor_home_page.png" alt="Tenor homepage" />
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
