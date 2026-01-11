import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./modules/auth/google.strategy.ts";
import authRoutes from "./modules/auth/auth.routes.ts";
import resumeRoutes from "./modules/resume/resume.routes.ts";
import jobRoutes from "./modules/job/job.routes";
import { seedJobs } from "./modules/job/job.seed";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import interviewRoutes from "./modules/interview/interview.routes";

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
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
