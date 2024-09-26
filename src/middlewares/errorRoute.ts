export default function (req: any, res: any) {
  return res.status(404).json({ error: "Rota não encontrada" });
}
