import { z } from "zod";

import mission from "../models/mission";
import feedback from "../models/feedback";

class FeedbackController {
  async store(req: any, res: any) {
    const schema = z.object({
      feedback: z.string(),
    });

    if (schema.safeParse(req.body).success === false) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const { id_user, id_mission } = req.auth;

    const missions = await mission.findAll();
    const lastMissionId = missions.length;

    if (id_mission !== lastMissionId) {
      return res
        .status(400)
        .json({ error: "Usuário não concluiu todas as missoes" });
    }

    const feedbackExists = await feedback.findOne({
      where: { id_user },
    });

    if (feedbackExists) {
      return res.status(400).json({ error: "Usuário já possui um feedback" });
    }

    await feedback.create({
      feedback: req.body.feedback,
      id_user,
    });

    return res.send();
  }
}

export default new FeedbackController();
