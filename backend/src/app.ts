import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./modules/auth/google.strategy.js";
import authRoutes from "./modules/auth/auth.routes.js";
import resumeRoutes from "./modules/resume/resume.routes.js";
import jobRoutes from "./modules/job/job.routes.js";
import interviewRoutes from "./modules/interviewSession/interviewSession.routes.js";
import adminJobRoutes from "./modules/job/job.admin.routes.js";
import adminQuestionRoutes from "./modules/question/question.admin.routes.js";
import { env } from "./config/env.js";

const app = express();

app.use(
	cors({
		origin: env.FRONTEND_URL,
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/health", (_, res) => {
	res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/interview", interviewRoutes);

// ADMIN ROUTES
app.use("/api/admin/jobs", adminJobRoutes);
app.use("/api/admin/questions", adminQuestionRoutes);

export default app;
