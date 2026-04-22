import { Router, type IRouter } from "express";
import healthRouter from "./health";
import callsRouter from "./calls";
import vapiWebhookRouter from "./vapi-webhook";

const router: IRouter = Router();

router.use(healthRouter);    // GET /healthz (no /api prefix — health check is at root)
router.use(callsRouter);     // POST /calls/outbound, POST /calls/manual, etc.
router.use(vapiWebhookRouter); // POST /vapi/webhook

export default router;
