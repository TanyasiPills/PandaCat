import React, { useState } from "react";
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

export default function MyNavbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Trigger the search functionality and send the search query to the parent component

    onSearch(searchQuery);
    setSearchQuery(""); // Clear the search query after submitting
  };

  return (
    <>
      <Navbar className="bg-body-tertiary mb-3" fixed="top">
        <Container fluid>
          <motion.div style={{ paddingLeft: "1vw", paddingRight: "1vh" }} whileHover={{ scale: [null, 1.5, 1.4] }}
            transition={{ duration: 0.3 }}>
            <Navbar.Brand href="/" ><Image fluid style={{ maxHeight: "40px" }} src={icon} alt="Icon" /></Navbar.Brand>
          </motion.div>
          <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>

            <div className="input-group">
              <input
                aria-label="searchbar"
                id="searchInput"
                type="text"
                className="form-control"
                placeholder="Search"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="input-group-text" type="submit">
                <img src={searchicon} alt="Search" />
              </button>
            </div>

          </Form>
          <Nav className="hoveringelunk justify-content-end flex-grow-1 pe-3">
            <motion.div whileHover={{ scale: [null, 1.5, 1.4] }}
              transition={{ duration: 0.3 }} style={{paddingLeft: "0.5vw", paddingRight:"0.5vw"}}>
              <Nav.Link href="/" >Home</Nav.Link></motion.div>
              <motion.div whileHover={{ scale: [null, 1.5, 1.4] }}
              transition={{ duration: 0.3 }} style={{paddingLeft: "0.5vw", paddingRight:"0.5vw"}}>
              <Nav.Link href="/favourites">Favourites</Nav.Link></motion.div>
            <motion.div whileHover={{ scale: [null, 1.5, 1.4] }}
              transition={{ duration: 0.3 }} style={{paddingLeft: "0.5vw", paddingRight:"0.5vw"}}>
              <Nav.Link href="/contact">Contact</Nav.Link></motion.div>
          </Nav>
        </Container>
      </Navbar >
    </>
  );
}