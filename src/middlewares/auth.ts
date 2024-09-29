import { JwtPayload, verify } from "jsonwebtoken";
import authConfig from "../config/auth";

import user from "../models/user";

export default async function (req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = (await verify(
      token,
      authConfig.secret ?? ""
    )) as JwtPayload;

    // @ts-ignore
    const { id_mission } = await user.findOne({
      where: { id_user: decoded.id_user },
    });

    if (id_mission !== decoded.id_mission) {
      throw new Error();
    }

    req.auth = {};
    req.auth.id_user = decoded.id_user;
    req.auth.id_mission = decoded.id_mission;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
