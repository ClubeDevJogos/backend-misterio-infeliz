import { z } from "zod";
import jwt from "jsonwebtoken";

import authConfig from "../config/auth";
import checkUserPassword from "../services/checkUserPassword";

import user from "../models/user";
import mission from "../models/mission";

class UserController {
  async store(req: any, res: any) {
    const userSchema = z.object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    if (userSchema.safeParse(req.body).success === false) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const { email } = req.body;

    const userExists = await user.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const { username, password } = req.body;

    const { id_mission } = (await mission.findOne({
      where: { id_chapter: 1 },
    })) as any;

    await user.create({
      username,
      email,
      password,
      id_mission,
    });

    return res.send();
  }

  async session(req: any, res: any) {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    if (userSchema.safeParse(req.body).success === false) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const { email } = req.body;

    const userExists = await user.findOne({ where: { email } });

    if (!userExists) {
      return res.status(400).json({ error: "User not found" });
    }

    const { password } = req.body;

    if (!(await checkUserPassword(password, userExists))) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    return res.json({
      token: jwt.sign({}, authConfig.secret ?? "", {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new UserController();
