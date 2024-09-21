import { z } from "zod";

import user from "../models/user";

class UserController {
  async store(req: any, res: any) {
    const userSchema = z.object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
      id_mission: z.string().uuid(),
    });

    if (userSchema.safeParse(req.body).success === false) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const { email } = req.body;

    const userExists = await user.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const { username, password, id_mission } = req.body;

    await user.create({
      username,
      email,
      password,
      id_mission,
    });

    return res.send();
  }
}

export default new UserController();
