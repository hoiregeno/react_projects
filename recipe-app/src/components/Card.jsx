import React, { useState } from "react";

function Card() {
  const [recipe, setRecipe] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [err, setErr] = useState("");

  async function handleFoodName(e) {
    e.preventDefault();
    const cleanFoodName = foodName.trim();
    if (!cleanFoodName) {
      setErr("Please enter a food name.");
      return;
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${cleanFoodName}`
      );

      if (!response.ok) {
        throw new Error(`Sorry, "${cleanFoodName}" was'nt found.`);
      }

      const data = await response.json();
      setRecipe(data);
      setFoodName("");
      setErr("");
    } catch (error) {
      setErr(err.message);
    }
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
