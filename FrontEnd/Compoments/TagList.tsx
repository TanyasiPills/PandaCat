import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";

interface TagListProps {
  taglist: string[];
  removable?: boolean;
}

const TagList: React.FC<TagListProps> = ({ taglist, removable = true }) => {
  const [tags, setTags] = useState<string[]>(taglist);

  useEffect(() => {
    // Update tags when taglist prop changes
    setTags(taglist);
  }, [taglist]);

  const removeTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
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
            <label className="btn btn-default" htmlFor="btn-check">
              {x}
            </label>
          )}
        </div>
      ))}
    </div>
  );
};

export default TagList;
