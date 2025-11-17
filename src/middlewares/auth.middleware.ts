import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt";

export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization;

    // jika belum ada header, berarti token belum diterima sistem
    if (!header || !header.startsWith("Bearer")) {
      res.status(401).send({
        error: "Unauthorized: token required",
      });
    }

    const token = header?.split(" ")[1];

    // bedah tokennya untuk diverif
    const decoded = verifyToken(token as string);

    if (!decoded) {
      return res.status(401).send({
        error: "Unauthorized: token invalid",
      });
    }

    (req as any).user = decoded; // inject user info
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
}
