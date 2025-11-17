import { NextFunction, Request, Response } from "express";

export function roleMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("user : ", (req as any).user);
  console.log("role : ", (req as any).user.role);
  if (!(req as any).user || (req as any).user.role !== "ADMIN") {
    res.status(403).json({ message: "Forbidden: Admin only" });
    return;
  }
  next();
}
