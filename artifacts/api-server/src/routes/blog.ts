import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, blogPostsTable } from "@workspace/db";
import {
  GetBlogPostsResponse,
  CreateBlogPostBody,
  CreateBlogPostResponse,
  GetBlogPostParams,
  GetBlogPostResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const serialize = (r: typeof blogPostsTable.$inferSelect) => ({
  ...r,
  imageUrl: r.imageUrl ?? null,
  publishedAt: r.publishedAt.toISOString(),
});

router.get("/blog", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(blogPostsTable)
    .orderBy(desc(blogPostsTable.publishedAt));
  res.json(GetBlogPostsResponse.parse(rows.map(serialize)));
});

router.post("/blog", async (req, res): Promise<void> => {
  const parsed = CreateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [post] = await db
    .insert(blogPostsTable)
    .values({ ...parsed.data, tags: parsed.data.tags ?? [] })
    .returning();
  res.status(201).json(CreateBlogPostResponse.parse(serialize(post)));
});

router.get("/blog/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug)
    ? req.params.slug[0]
    : req.params.slug;
  const params = GetBlogPostParams.safeParse({ slug: raw });
  if (!params.success) {
    res.status(400).json({ error: "Invalid slug" });
    return;
  }
  const [post] = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.slug, params.data.slug));
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(GetBlogPostResponse.parse(serialize(post)));
});

export default router;
