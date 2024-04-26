import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import searchicon from "/search.svg";
import { motion } from "framer-motion"
import {
  Container,
  Form,
  Nav,
  Navbar, Image

} from "react-bootstrap";
import icon from "../../public/PandaCatLogo.png";
import "./CSS/Navbar.css"

export default class MyNavbar extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Navbar className="bg-body-tertiary mb-3" fixed="top">
          <Container fluid>
            <motion.div whileHover={{ scale: [null, 1.5, 1.4] }}
              transition={{ duration: 0.3 }}>
              <Navbar.Brand href="/" ><Image fluid style={{ maxHeight: "40px" }} src={icon} alt="Icon" /></Navbar.Brand>
            </motion.div>
            <Form className="d-flex">

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  name="q"
                />

                <span className="input-group-text">
                  <img src={searchicon} alt="Search" />
                </span>
              </div>

            </Form>
            <Nav className="hoveringelunk justify-content-end flex-grow-1 pe-3">
              <motion.div whileHover={{ scale: [null, 1.5, 1.4] }}
                transition={{ duration: 0.3 }}>
                <Nav.Link href="/" >Home</Nav.Link></motion.div>
              <motion.div whileHover={{ scale: [null, 1.5, 1.4] }}
                transition={{ duration: 0.3 }}>
                <Nav.Link href="/contact">Contact</Nav.Link></motion.div>

            </Nav>
          </Container>
        </Navbar >
      </>
    );
  }
}
