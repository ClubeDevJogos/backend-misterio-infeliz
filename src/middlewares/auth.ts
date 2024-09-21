import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

export default async function (req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not found" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await jwt.verify(token, authConfig.secret ?? "");
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
