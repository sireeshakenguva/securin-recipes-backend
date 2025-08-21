export function toNullIfNaN(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const t = value.trim().toLowerCase();
    if (t === "" || t === "nan") return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export function extractCaloriesNumber(nutrients) {
  if (!nutrients) return null;
  const val = nutrients.calories || nutrients.Calories || "";
  const m = String(val).match(/([0-9]+(?:\.[0-9]+)?)/);
  return m ? Number(m[1]) : null;
}
