import { Job } from "./job.model.js";
import { matchJob } from "./job.matcher.js";

export const matchJobsForResume = async (resumeSkills: string[]) => {
	const jobs = await Job.find();

	return jobs
		.map((job) => {
			const result = matchJob(resumeSkills, job.requiredSkills);
			return {
				jobId: job.id,
				title: job.title,
				company: job.company,
				score: result.score,
				matchedSkills: result.matchedSkills,
				missingSkills: job.requiredSkills.filter(
					(skill) => !result.matchedSkills.includes(skill)
				),
			};
		})
		.filter((j) => j.score > 0)
		.sort((a, b) => b.score - a.score);
};
