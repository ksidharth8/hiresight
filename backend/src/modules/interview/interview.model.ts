import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		role: { type: String, required: true },
		questions: [String],
		answers: [String],
		feedback: String,
	},
	{ timestamps: true }
);

export const InterviewSession = mongoose.model(
	"InterviewSession",
	InterviewSchema
);
