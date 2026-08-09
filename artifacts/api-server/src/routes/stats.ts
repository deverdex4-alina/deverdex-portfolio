import { Router, type IRouter } from "express";
import { GetStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  res.json(
    GetStatsResponse.parse({
      projectsDelivered: 50,
      happyClients: 30,
      avgRating: 5.0,
      countriesServed: 15,
      yearsOfExperience: 3,
    })
  );
});

export default router;
