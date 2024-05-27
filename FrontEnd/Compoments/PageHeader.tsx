import React from "react";
import "./CSS/PageHeader.css"

interface Props {
  text: string
}

export default function MyNavbar({text}:  Props ) {

  return (<h1 className="myheader">{text}</h1>);
}
