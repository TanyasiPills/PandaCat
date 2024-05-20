import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Navigate, useNavigate } from "react-router-dom";

interface TagListProps {
  taglist: string[];
  removable?: boolean;
  callback: (tags: string[]) => void;
}

const TagList: React.FC<TagListProps> = ({
  taglist,
  removable = true,
  callback,
}) => {
  const [tags, setTags] = useState<string[]>(taglist);
  const navigate = useNavigate();

  useEffect(() => {
    // Update tags when taglist prop changes
    setTags(taglist);
    callback(taglist);
  }, [taglist, callback]);

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    callback(updatedTags); // Call the callback with updated tags
  };

  
  return (
    <div className="btn-group">
      {tags.map((x, i) => (
        <div className="btn-group" key={i}>
          {removable ? (
            <>
              <input
                type="checkbox"
                className="btn-check"
                id={`btn-check-${i}`}
                autoComplete="off"
              />
              <label className="btn btn-default" htmlFor={`btn-check-${i}`}>
                {x}
              </label>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => removeTag(i)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </>
          ) : (
            <label
              className="btn btn-default"
              onClick={() => navigate("/",{state:{clickedString: x}})}
            >
              {x}
            </label>
          )}
        </div>
      ))}
    </div>
  );
};

export default TagList;