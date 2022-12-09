import React from "react";
import "./Card.css";
import { getDatabase, ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { tooltipClasses } from "@mui/material";
function Card({ url, description, price, index, keyl, total }) {

  const server = "http://localhost:3002";
  return (
    <div className="card" style={{ color: "black" }}>
      <button onClick={() => {
        console.log(keyl);
        total.current=0;
        remove(ref(getDatabase(), "users/" + getAuth().currentUser.uid + "/cart/" + keyl))
      }}>X</button>
      <img src={url} alt="" />
      <div className="card__info">
        <h1>{description}</h1>
        <p>{description}</p>
        <p>{price}$</p>
      </div>
    </div>
  );
}

export default Card;
