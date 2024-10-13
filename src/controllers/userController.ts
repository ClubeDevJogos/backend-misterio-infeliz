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
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const { email } = req.body;

    if (!email.endsWith("feliz.ifrs.edu.br")) {
      return res
        .status(400)
        .json({ error: "Email não corresponde a instituição" });
    }

    const userExists = await user.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existente" });
    }

    const { username, password } = req.body;

    // @ts-ignore
    const { id_mission } = await mission.findOne({
      where: { id_chapter: 1 },
    });

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
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const { email } = req.body;

    const userExists = await user.findOne({ where: { email } });

    if (!userExists) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const { password } = req.body;

    if (!(await checkUserPassword(password, userExists))) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    // @ts-ignore
    const { id_user, username } = userExists;

    return res.json({
      username,
      email,
      token: jwt.sign({ id_user }, authConfig.secret ?? "", {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async updateMission(req: any, res: any) {
    // @ts-ignore
    const { id_mission } = await user.findOne({
      where: { id_user: req.auth.id_user },
    });

    const next_mission = await mission.findOne({
      where: { id_mission: id_mission + 1 },
    });

    if (!next_mission) {
      return res
        .status(400)
        .json({ error: "Usuário concluiu todas as missoes" });
    }

    await user.update(
      // @ts-ignore
      { id_mission: next_mission.id_mission },
      { where: { id_user: req.auth.id_user } }
    );

    return res.send();
  }

  async showMission(req: any, res: any) {
    // @ts-ignore
    const { id_mission } = await user.findOne({
      where: { id_user: req.auth.id_user },
    });

    return res.json(id_mission);
  }
}

export default new UserController();
