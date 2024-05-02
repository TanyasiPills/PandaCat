import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";

interface TagListProps {
  taglist: string[];
  deleteIsPossible?: boolean;
}

export default function TagList({ taglist, deleteIsPossible }: TagListProps) {
  return (
    <div className="btn-group">
      {Tmp(taglist, deleteIsPossible)}
    </div>
  );
}

function Tmp(taglist: string[], deleteIsPossible?: boolean) {
  if (deleteIsPossible) {
    return taglist.map((x, index) => (
      <div className="btn-group" key={index}>
        <label className="btn btn-default">{x}</label>
        <button type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    ));
  } else {
    return taglist.map((x, index) => (
      <div className="btn-group" key={index}>
        <label className="btn btn-default">{x}</label>
      </div>
    ));
  }
}
