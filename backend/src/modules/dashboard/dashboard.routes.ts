import { Router } from "express";
import { dashboard } from "./dashboard.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

// GET /api/dashboard
router.get("/", authMiddleware, dashboard);

export default router;
