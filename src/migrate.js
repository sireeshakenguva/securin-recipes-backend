import { dbPromise } from "./db.js";

const migrate = async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cuisine TEXT,
      title TEXT,
      rating REAL,
      prep_time INTEGER,
      cook_time INTEGER,
      total_time INTEGER,
      description TEXT,
      nutrients TEXT,
      serves TEXT,
      calories_num REAL
    );
  `);
  console.log("Migration complete ✅");
  process.exit(0);
};

migrate();
