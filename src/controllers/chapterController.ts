import chapter from "../models/chapter";

class ChapterController {
  async index(req: any, res: any) {
    const chapters = await chapter.findAll();

    return res.json(chapters);
  }
}

export default new ChapterController();
