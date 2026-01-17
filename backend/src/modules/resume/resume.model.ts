import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		cloudinaryId: String,
		resumeUrl: { type: String, required: true },
		extractedText: String,
		skills: [String],
		score: Number,
	},
	{ timestamps: true },
);

export const Resume = mongoose.model("Resume", ResumeSchema);
