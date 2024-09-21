import { compare } from "bcryptjs";

export default async function (senha: string, user: object) {
  if ("password" in user) {
    return await compare(senha, user.password as string);
  }
}
