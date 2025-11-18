import express from "express";
import AuthRouter from "./routers/auth.router";
import DummyRouter from "./routers/dummy.router";
import { setupSwagger } from "./swagger";

const app = express();
const PORT = 8000;

app.use(express.json());

setupSwagger(app);

app.use("/api/auth", AuthRouter);
app.use("/api/dummy", DummyRouter);

app.listen(PORT, () => {
  console.log("Server running on http://localhost:", PORT);
});
