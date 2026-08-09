import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import blogRouter from "./blog";
import servicesRouter from "./services";
import experimentsRouter from "./experiments";
import formsRouter from "./forms";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(blogRouter);
router.use(servicesRouter);
router.use(experimentsRouter);
router.use(formsRouter);
router.use(statsRouter);

export default router;
