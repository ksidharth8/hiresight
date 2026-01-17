import mongoose from "mongoose";

const SkillProgressSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		skill: { type: String, required: true },
		confidenceScore: { type: Number, min: 0, max: 100 },
	},
	{ timestamps: true },
);

export const SkillProgress = mongoose.model(
	"SkillProgress",
	SkillProgressSchema,
);
