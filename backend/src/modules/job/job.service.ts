import { Job } from "./job.model.js";

const matchJob = (resumeSkills: string[], jobSkills: string[]) => {
	const matched = jobSkills.filter((skill) => resumeSkills.includes(skill));

	const score = (matched.length / jobSkills.length) * 100;

	return {
		matchedSkills: matched,
		score: Math.round(score),
	};
};

export const matchJobsForResume = async (resumeSkills: string[]) => {
	const jobs = await Job.find();

	return jobs
		.map((job) => {
			const requiredSkillNames = job.requiredSkills.map(
				(skill) => skill.name,
			);
			const result = matchJob(resumeSkills, requiredSkillNames);
			return {
				jobId: job._id,
				title: job.title,
				company: job.company,
				score: result.score,
				matchedSkills: result.matchedSkills,
				missingSkills: requiredSkillNames.filter(
					(skill) => !result.matchedSkills.includes(skill),
				),
			};
		})
		.filter((j) => j.score > 0)
		.sort((a, b) => b.score - a.score);
};
