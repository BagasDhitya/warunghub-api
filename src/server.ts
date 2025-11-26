import express from "express";
import AuthRouter from "./routers/auth.router";
import DummyRouter from "./routers/dummy.router";
import { setupSwagger } from "./swagger";

const app = express();
const PORT = 8000;

app.use(express.json());

// 🔥 Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running smoothly 🚀",
    uptime: process.uptime(), // lama server hidup
    timestamp: new Date().toISOString(), // waktu response
  });
});

setupSwagger(app);

app.use("/api/auth", AuthRouter);
app.use("/api/dummy", DummyRouter);

app.listen(PORT, () => {
  console.log("Server running on http://localhost:", PORT);
});
