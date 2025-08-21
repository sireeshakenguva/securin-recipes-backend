import { toNullIfNaN, extractCaloriesNumber } from "./parseHelpers.js";

export function cleanRecipe(raw) {
  const r = {
    cuisine: raw.cuisine ?? null,
    title: raw.title ?? null,
    rating: toNullIfNaN(raw.rating),
    prep_time: toNullIfNaN(raw.prep_time),
    cook_time: toNullIfNaN(raw.cook_time),
    total_time: toNullIfNaN(raw.total_time),
    description: raw.description ?? null,
    nutrients: raw.nutrients ?? {},
    serves: raw.serves ?? null,
  };
  r.calories_num = extractCaloriesNumber(r.nutrients);
  return r;
}
