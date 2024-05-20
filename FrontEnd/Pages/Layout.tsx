import React from "react";
import { Container } from "react-bootstrap";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import MyNavbar from "../Compoments/MyNavbar";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <Container>
      <MyNavbar onSearch={()=>{
        navigate("/",{state:{clickedString: ""}})
      }} />
      <Outlet />
    </Container>
  );
}