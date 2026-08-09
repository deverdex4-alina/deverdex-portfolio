import { Router, type IRouter } from "express";
import { db, quoteRequestsTable, contactMessagesTable } from "@workspace/db";
import {
  SubmitQuoteBody,
  SubmitQuoteResponse,
  SubmitContactBody,
  SubmitContactResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/quote", async (req, res): Promise<void> => {
  const parsed = SubmitQuoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await db.insert(quoteRequestsTable).values(parsed.data);
  res
    .status(201)
    .json(
      SubmitQuoteResponse.parse({ success: true, message: "Quote request submitted successfully" })
    );
});

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await db.insert(contactMessagesTable).values(parsed.data);
  res
    .status(201)
    .json(
      SubmitContactResponse.parse({ success: true, message: "Message sent successfully" })
    );
});

export default router;
