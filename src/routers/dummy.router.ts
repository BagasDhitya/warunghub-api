import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { Router, Request, Response } from "express";

// simulasi RBAC
const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware, // only admin can access
  (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      message: "Success simulating RBAC (Role based Access Control)",
    });
  }
);

export default router;
