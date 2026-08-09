import { Router, type IRouter } from "express";
import { db, servicesTable } from "@workspace/db";
import { GetServicesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/services", async (_req, res): Promise<void> => {
  const rows = await db.select().from(servicesTable);
  res.json(
    GetServicesResponse.parse(
      rows.map((r) => ({
        ...r,
        packages: r.packages as Array<{ name: string; price: string; delivery: string }>,
      }))
    )
  );
});

export default router;
