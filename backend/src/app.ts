import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./modules/auth/google.strategy.js";
import authRoutes from "./modules/auth/auth.routes.js";
import resumeRoutes from "./modules/resume/resume.routes.js";
import jobRoutes from "./modules/job/job.routes.js";
import { seedJobs } from "./modules/job/job.seed.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import interviewRoutes from "./modules/interview/interview.routes.js";
import { env } from "./config/env.js";

const app = express();

app.use(
	cors({
		origin: env.FRONTEND_URL,
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/health", (_, res) => {
	res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
seedJobs();
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/interview", interviewRoutes);

export default app;
