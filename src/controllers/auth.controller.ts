import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // validasi email dan pwd
      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: "Missing email or password",
        });
      }

      await authService.register(email, password);

      res.status(201).send({
        success: true,
        message: "Register success",
      });
    } catch (error: any) {
      res.status(400).send({
        error: error.message,
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.status(200).send({
        success: true,
        message: "Login success",
        data: {
          email: email,
          token: result.token,
        },
      });
    } catch (error: any) {
      res.status(400).send({
        error: error.message,
      });
    }
  },
};
