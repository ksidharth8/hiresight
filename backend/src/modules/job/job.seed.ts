import { Job } from "./job.model.js";

export const seedJobs = async () => {
	const count = await Job.countDocuments();
	if (count > 0) return;

	await Job.insertMany([
		{
			title: "Frontend Developer",
			company: "StartupX",
			requiredSkills: ["javascript", "react", "css"],
		},
		{
			title: "Backend Developer",
			company: "TechCorp",
			requiredSkills: ["node.js", "express", "mongodb"],
		},
		{
			title: "Full Stack Developer",
			company: "Innovate Ltd",
			requiredSkills: ["react", "node.js", "postgresql"],
		},
	]);
};
