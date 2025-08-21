import fs from "fs";
import { dbPromise } from "./db.js";
import { cleanRecipe } from "./util/parse.js";

const seed = async () => {
  const db = await dbPromise;
  const raw = JSON.parse(fs.readFileSync("./data/US_recipes.json", "utf-8"));

  for (const key of Object.keys(raw)) {
    const recipe = cleanRecipe(raw[key]);
    await db.run(
      `INSERT INTO recipes
       (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves, calories_num)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.cuisine,
        recipe.title,
        recipe.rating,
        recipe.prep_time,
        recipe.cook_time,
        recipe.total_time,
        recipe.description,
        JSON.stringify(recipe.nutrients || {}),
        recipe.serves,
        recipe.calories_num
      ]
    );
  }
  console.log("Database seeded ✅");
  process.exit(0);
};

seed();
