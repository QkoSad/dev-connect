import express from "express";
import connectDB from "./config/db";
import path from "path";
import cors from "cors";

const app = express();

// add cors otherwise fronend cannot access backedn
app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/users", require("./routers/api/users"));
app.use("/api/auth", require("./routers/api/auth"));
app.use("/api/profile", require("./routers/api/profile"));
app.use("/api/posts", require("./routers/api/posts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  console.log("in production");
  app.use(express.static("client/build"));
  app.get("*", (_, res) => [
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")),
  ]);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
