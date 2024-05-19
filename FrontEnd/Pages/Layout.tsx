import React from "react";
import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import MyNavbar from "../Compoments/MyNavbar";

export default function Layout() {
  var str =
    useLocation().pathname.replace("/", "").charAt(0).toUpperCase() +
    useLocation().pathname.replace("/", "").slice(1);
  return (
    <Container>
      <MyNavbar />
      <Outlet />
    </Container>
  );
}
