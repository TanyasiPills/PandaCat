import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";

export default class TagList extends React.Component<{ taglist: string[] }> {
  render(): React.ReactNode {
    return (
      <div className="btn-group">
        {this.props.taglist.map((x) => (
          <div className="btn-group">
            <label className="btn btn-default">{x}</label>
            <button type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))}
      </div>
    );
  }
}
