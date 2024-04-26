import React from "react";
import "./CSS/PageHeader.css"
export default class Akarmi extends React.Component<{ text: string }> {
  render() {
    return <h1 className="myheader">{this.props.text}</h1>;
  }
}
