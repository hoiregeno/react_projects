import React, { useEffect, useState } from "react";

function Card() {
  const [recipe, setRecipe] = useState({});
  const [foodName, setFoodName] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (
      !recipe ||
      (Array.isArray(recipe) && recipe.length === 0) ||
      (typeof recipe === "object" && Object.keys(recipe).length === 0)
    ) {
      return;
    }
    console.log(recipe);
  }, [recipe]);

  async function handleFoodName(e) {
    e.preventDefault();
    const cleanFoodName = foodName.trim();
    if (!cleanFoodName) {
      setErr("Please enter a food name.");
      return;
    }

    setErr("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${cleanFoodName}`
      );

      if (!response.ok) {
        throw new Error(`Sorry, "${cleanFoodName}" was'nt found.`);
      }

      const { meals } = await response.json();
      if (!meals) {
        setRecipe(null);
        setErr(`Sorry, "${cleanFoodName}" wasn't found.`);
        return;
      }

      setRecipe(meals);
      setFoodName("");
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
