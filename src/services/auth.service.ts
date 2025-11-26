import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/jwt";
import { Role } from "@prisma/client";

export const authService = {
  async register(email: string, password: string, role: string) {
    const found = await prisma.user.findUnique({
      where: { email },
    });

    if (found) {
      throw new Error("Email already registered");
    }

    // jika email belum ada, maka hash passwordnya
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan ke db
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role as Role,
      },
    });

    return user;
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // jika user tidak terdaftar, maka invalid credential
    if (!user) {
      throw new Error("Invalid credentials. User not registered.");
    }

    // jika user ada, maka cocokkan passwordnya
    const isValid = await bcrypt.compare(password, user.password);

    // jika password tidak valid
    if (!isValid) {
      throw new Error("Invalid password");
    }

    // jika password valid, tukar data user dengan token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { token };
  },
};
