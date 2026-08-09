import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, projectsTable } from "@workspace/db";
import {
  GetProjectsQueryParams,
  GetProjectsResponse,
  CreateProjectBody,
  CreateProjectResponse,
  GetProjectParams,
  GetProjectResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/projects", async (req, res): Promise<void> => {
  const query = GetProjectsQueryParams.safeParse(req.query);
  const rows = await db
    .select()
    .from(projectsTable)
    .orderBy(desc(projectsTable.createdAt));

  const filtered =
    query.success && query.data.category
      ? rows.filter((r) => r.category === query.data.category)
      : rows;

  res.json(
    GetProjectsResponse.parse(
      filtered.map((r) => ({
        ...r,
        imageUrl: r.imageUrl ?? null,
        liveUrl: r.liveUrl ?? null,
        createdAt: r.createdAt.toISOString(),
      }))
    )
  );
});

router.post("/projects", async (req, res): Promise<void> => {
  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [project] = await db
    .insert(projectsTable)
    .values({ ...parsed.data, tags: parsed.data.tags ?? [] })
    .returning();
  res.status(201).json(
    CreateProjectResponse.parse({
      ...project,
      imageUrl: project.imageUrl ?? null,
      liveUrl: project.liveUrl ?? null,
      createdAt: project.createdAt.toISOString(),
    })
  );
});

router.get("/projects/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetProjectParams.safeParse({ id: parseFloat(raw) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, params.data.id));
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(
    GetProjectResponse.parse({
      ...project,
      imageUrl: project.imageUrl ?? null,
      liveUrl: project.liveUrl ?? null,
      createdAt: project.createdAt.toISOString(),
    })
  );
});

export default router;
