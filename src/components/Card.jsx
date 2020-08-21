import React from "react";
import { Link } from "react-router-dom";
import "./../styles/card.scss";

const Card = ({ title, name = "dummy user", link }) => {
  return (
    <div className="container">
      <div className="title">Album Title : {title}</div>
      <div className="username">
        <span>User : {name}</span>
        <Link to={link}>View More</Link>{" "}
      </div>
    </div>
  );
};

export default Card;
