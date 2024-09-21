export function jsonSyntaxError(err: any, req: any, res: any, next: any) {
  if (
    err instanceof SyntaxError &&
    "status" in err &&
    err.status === 400 &&
    "body" in req
  ) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  next();
}
