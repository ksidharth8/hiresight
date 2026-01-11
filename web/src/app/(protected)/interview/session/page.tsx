"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api.client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Progress } from "@/components/ui/progress";

interface InterviewSession {
	role: string;
	questions: string[];
	answers: string[];
}

export default function InterviewSessionPage() {
	const router = useRouter();
	const [session, setSession] = useState<InterviewSession | null>(null);
	const [index, setIndex] = useState(0);
	const [current, setCurrent] = useState("");
	const [feedback, setFeedback] = useState<string | null>(null);
	const [status, setStatus] = useState<"answering" | "analyzing" | "done">(
		"answering"
	);
	const [submitting, setSubmitting] = useState(false);
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		const raw = sessionStorage.getItem("interview_session");

		if (raw) {
			const parsed = JSON.parse(raw);
			setSession(parsed);
			setIndex(parsed.answers.length);
		}

		setHydrated(true);
	}, []);

	if (hydrated && !session) {
		router.push("/interview/start");
		return null;
	}

	if (!session) return null;

	const question = session.questions[index];

	async function next() {
		if (!session) return;

		const updatedSession: InterviewSession = {
			...session,
			answers: [...session.answers, current],
		};

		setSession(updatedSession);
		sessionStorage.setItem(
			"interview_session",
			JSON.stringify(updatedSession)
		);

		setCurrent("");

		if (index + 1 === session.questions.length) {
			setSubmitting(true);
			setStatus("analyzing");

			await new Promise((r) => setTimeout(r, 0));

			const res = await clientFetch("/api/interview/submit", {
				method: "POST",
				body: JSON.stringify({
					role: updatedSession.role,
					questions: updatedSession.questions,
					answers: updatedSession.answers,
				}),
			});

			setFeedback(res.feedback);
			setStatus("done");
			sessionStorage.removeItem("interview_session");
		} else {
			setIndex(index + 1);
		}
	}

	if (status === "analyzing") {
		return (
			<Card className="max-w-2xl mx-auto p-6 space-y-4 mt-8">
				<p className="font-medium">Analyzing your interview…</p>
				<Progress value={70} />
			</Card>
		);
	}

	if (feedback) {
		return (
			<Card className="max-w-2xl mx-auto p-6">
				<h2 className="text-xl font-semibold mb-2">Interview Feedback</h2>
				<div className="prose dark:prose-invert whitespace-pre-wrap">
					<ReactMarkdown>{feedback}</ReactMarkdown>
				</div>
				<Button className="mt-4" onClick={() => router.push("/dashboard")}>
					Back to Dashboard
				</Button>
			</Card>
		);
	}

	return (
		<div className="max-w-2xl mx-auto space-y-4 mt-8">
			<Card className="p-4">
				<p className="font-medium">
					Question {index + 1} / {session.questions.length}
				</p>
				<p className="mt-2">{question}</p>
			</Card>

			<textarea
				value={current}
				onChange={(e) => setCurrent(e.target.value)}
				className="w-full border rounded p-3 min-h-35 bg-background"
				placeholder="Type your answer here…"
			/>

			<Button onClick={next} disabled={!current || submitting}>
				{index + 1 === session.questions.length ? "Submit" : "Next"}
			</Button>
		</div>
	);
}
