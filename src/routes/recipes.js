import express from "express";
import { dbPromise } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const db = await dbPromise;
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || "10", 10)));
  const offset = (page - 1) * limit;

  const total = (await db.get("SELECT COUNT(*) AS count FROM recipes")).count;
  const data = await db.all(
    "SELECT * FROM recipes ORDER BY rating DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );

  res.json({ page, limit, total, data });
});

function parseOpVal(s) {
  if (!s) return null;
  const m = String(s).trim().match(/^(<=|>=|=|==|<|>)?\s*([0-9]+(?:\.[0-9]+)?)$/);
  if (!m) return null;
  const op = m[1] || "=";
  const val = Number(m[2]);
  return { op: op === "==" ? "=" : op, val };
}

router.get("/search", async (req, res) => {
  const db = await dbPromise;
  const { title, cuisine, rating, calories, total_time } = req.query;

  const clauses = [];
  const params = [];

  if (title) { clauses.push("LOWER(title) LIKE ?"); params.push(`%${String(title).toLowerCase()}%`); }
  if (cuisine) { clauses.push("cuisine = ?"); params.push(cuisine); }

  const r = parseOpVal(rating);
  if (r) { clauses.push(`rating ${r.op} ?`); params.push(r.val); }

  const c = parseOpVal(calories);
  if (c) { clauses.push(`calories_num ${c.op} ?`); params.push(c.val); }

  const t = parseOpVal(total_time);
  if (t) { clauses.push(`total_time ${t.op} ?`); params.push(t.val); }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const data = await db.all(`SELECT * FROM recipes ${where} ORDER BY rating DESC`, params);
  res.json({ count: data.length, data });
});

export default router;
