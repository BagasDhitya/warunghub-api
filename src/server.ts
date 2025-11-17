import express from "express";
import AuthRouter from "./routers/auth.router";
import DummyRouter from './routers/dummy.router'

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/api/auth", AuthRouter);
app.use("/api/dummy", DummyRouter)

app.listen(PORT, () => {
  console.log("Server running on http://localhost:", PORT);
});
