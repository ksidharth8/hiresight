"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ResumeUpload() {
	const router = useRouter();
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const pdf = acceptedFiles[0];
		if (!pdf || pdf.type !== "application/pdf") {
			setError("Only PDF resumes are supported");
			return;
		}
		setError(null);
		setFile(pdf);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: { "application/pdf": [".pdf"] },
	});

	async function upload() {
		if (!file) return;

		setUploading(true);
		setProgress(30);

		const formData = new FormData();
		formData.append("resume", file);

		try {
			setProgress(60);
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE}/api/resume/upload`,
				{
					method: "POST",
					body: formData,
					credentials: "include",
				},
			);

			if (res.status === 401) {
				window.location.href = "/login";
				return;
			}

			if (!res.ok) {
				throw new Error("Upload failed");
			}

			const data = await res.json();
			setProgress(100);

			router.push(`/resume/${data.resumeId}`);
		} catch (e: any) {
			setError(e.message || "Something went wrong");
			setUploading(false);
			setProgress(0);
		}
	}

	return (
		<div className="max-w-xl mx-auto mt-12">
			<Card>
				<CardHeader>
					<h2 className="text-xl font-semibold">Upload Resume</h2>
					<p className="text-sm text-muted-foreground">
						Upload your latest resume (PDF only, less than 2MB).
					</p>
				</CardHeader>

				<CardContent className="space-y-6">
					<div
						{...getRootProps()}
						className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
              ${isDragActive ? "border-primary" : "border-border"}
            `}
					>
						<input {...getInputProps()} />
						{file ? (
							<p className="font-medium">{file.name}</p>
						) : (
							<p className="text-muted-foreground">
								Drag & drop your PDF here, or click to select
							</p>
						)}
					</div>

					{uploading && (
						<div className="space-y-2">
							<Progress value={progress} />
							<p className="text-sm text-muted-foreground">
								Analyzing resume…
							</p>
						</div>
					)}

					{error && <p className="text-sm text-red-500">{error}</p>}

					<Button
						className="w-full"
						disabled={!file || uploading}
						onClick={upload}
					>
						{uploading ? "Uploading…" : "Upload Resume"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
