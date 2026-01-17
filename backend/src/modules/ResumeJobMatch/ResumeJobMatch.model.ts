import mongoose from "mongoose";

const ResumeJobMatchSchema = new mongoose.Schema(
	{
		resumeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Resume",
			required: true,
		},
		jobId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Job",
			required: true,
		},
		matchScore: Number,
		matchedSkills: [String],
		missingSkills: [String],
	},
	{ timestamps: true },
);

export const ResumeJobMatch = mongoose.model(
	"ResumeJobMatch",
	ResumeJobMatchSchema,
);
