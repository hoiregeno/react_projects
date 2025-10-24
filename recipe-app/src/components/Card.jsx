import React, { useState } from "react";

function Card() {
  const [recipe, setRecipe] = useState(null);
  const [foodName, setFoodName] = useState("");

  async function handleFoodName(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleFoodName}>
        <input type="text" placeholder="Enter food name" />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default Card;
