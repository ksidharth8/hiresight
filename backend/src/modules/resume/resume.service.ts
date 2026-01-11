import { Resume } from "./resume.model";

export const saveResume = async ({
	userId,
	cloudinaryId,
	resumeUrl,
	extractedText,
	skills,
	score,
}: {
	userId: string;
	cloudinaryId: string;
	resumeUrl: string;
	extractedText: string;
	skills: string[];
	score: number;
}) => {
	return Resume.create({
		userId,
		cloudinaryId,
		resumeUrl,
		extractedText,
		skills,
		score,
	});
};
