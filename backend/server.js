import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.route.js";
import ReadmeRoutes from "./routes/readme.route.js";
import ReadmeProgRoutes from "./routes/readme.js";

dotenv.config();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/products", ProductRoutes);
app.use("/api/readme", ReadmeRoutes);
app.use("/api/readme/prog", ReadmeProgRoutes);

if (process.env.NODE_ENV !== "production") {
  app.get("/", (req, res) => res.send("Server is ready!"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

// Start the HTTP server first so README endpoints are available even without a DB.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to DB in the background — product routes need it, readme routes don't.
connectDB()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.warn("DB connection failed (product routes unavailable):", err.message);
  });
