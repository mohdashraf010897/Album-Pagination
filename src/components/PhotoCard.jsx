import React from "react";
import "./../styles/photoCard.scss";

const PhotoCard = ({ url, title }) => {
  return (
    <div className="photo-container">
      <div className="img-container">
        <img src={url} alt={title || "placeholder photo"} />
      </div>
      <div className="title">{title?.toUpperCase()}</div>
    </div>
  );
};

export default PhotoCard;
