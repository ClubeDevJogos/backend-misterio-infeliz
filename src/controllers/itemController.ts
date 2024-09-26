import { z } from "zod";

import item from "../models/item";
import user_item from "../models/user_item";

class ItemController {
  async hasItem(req: any, res: any) {
    const itemSchema = z.object({
      item_name: z.string().min(2),
    });

    if (itemSchema.safeParse(req.body).success === false) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    // @ts-ignore
    const { id_item } = await item.findOne({
      where: { name: req.body.item_name },
    });

    const id_user = req.uid_user;

    const hasItem = await user_item.findOne({
      where: { id_user, id_item },
    });

    if (!hasItem) {
      return res.status(400).json({ error: "Usuário não possui esse item" });
    }

    return res.send();
  }
}

export default new ItemController();
