import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
	{
		title: String,
		company: String,
		description: String,
		requiredSkills: [String],
	},
	{ timestamps: true }
);

export const Job = mongoose.model("Job", JobSchema);
