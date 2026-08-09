import { Router, type IRouter } from "express";
import { db, experimentsTable } from "@workspace/db";
import { GetExperimentsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/experiments", async (_req, res): Promise<void> => {
  const rows = await db.select().from(experimentsTable);
  res.json(GetExperimentsResponse.parse(rows));
});

export default router;
