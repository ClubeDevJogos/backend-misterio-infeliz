export default function (req: any, res: any) {
  return res.status(404).json({ error: "Route not found" });
}
