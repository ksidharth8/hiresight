import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		company: { type: String, required: true },
		description: String,
		level: {
			type: String,
			enum: ["beginner", "intermediate", "advanced"],
			required: true,
		},
		requiredSkills: [
			{
				name: { type: String, lowercase: true, required: true },
				weight: { type: Number, min: 1, max: 5, required: true },
			},
		],
		optionalSkills: [String],
	},
	{ timestamps: true },
);

export const Job = mongoose.model("Job", JobSchema);
