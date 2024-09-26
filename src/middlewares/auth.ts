import { JwtPayload, verify } from "jsonwebtoken";
import authConfig from "../config/auth";

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
    req.uid_user = decoded.id_user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
