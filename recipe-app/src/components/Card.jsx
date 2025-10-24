import React, { useEffect, useState } from "react";

function Card() {
  const [recipe, setRecipe] = useState({});
  const [foodName, setFoodName] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (recipe === null) return;
    console.log(recipe);
  }, [recipe]);

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
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleFoodName}>
        <input
          type="text"
          placeholder="Enter food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {err && <p>{err}</p>}
    </>
  );
}

export default Card;
