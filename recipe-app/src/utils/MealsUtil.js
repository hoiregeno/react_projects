export function extractMealProperties(meals = []) {
  // Return empty array if meals is invalid or empty
  if (!Array.isArray(meals) || meals.length === 0) return [];

  // Filter out falsy meals and map each meal to a formatted object
  return meals.filter(Boolean).map((meal) => {
    // Extract key meal info and ensure safe defaults
    const id = meal.idMeal ?? "";
    const name = meal.strMeal ?? "";
    const category = meal.strCategory ?? "";
    const area = meal.strArea ?? "";
    const instructions = meal.strInstructions ?? "";
    const thumbnail = meal.strMealThumb ?? "";
    const youtube = meal.strYoutube ?? "";
    const source = meal.strSource ?? "";

    // clean up tags into an array
    const tags = meal.strTags
      ? String(meal.strTags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    // Initialize array to store ingredient and measure pairs
    const ingredients = [];

    // Loop through up to 20 ingredient slots, clean and store valid ones with their measures
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      // Add non-empty ingredients with their measures to the ingredients array
      if (ingredient && String(ingredient).trim()) {
        ingredients.push({
          ingredient: String(ingredient).trim(),
          measure: measure ? String(measure).trim() : "",
        });
      }
    }

    // Return an array of these simplified objects ready for UI or further processing.
    return {
      id,
      name,
      category,
      area,
      instructions,
      thumbnail,
      tags,
      youtube,
      source,
      ingredients,
    };
  });
}
