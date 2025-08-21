import express from "express";
import cors from "cors";
import recipesRouter from "./routes/recipes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.json({ ok: true, service: "Securin Recipes API" }));
app.use("/api/recipes", recipesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
