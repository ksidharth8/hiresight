import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: "HireSight - AI Career Intelligence Platform",
	description:
		"HireSight helps students and freshers analyze resumes, match jobs, and practice interviews with AI-powered feedback.",
	keywords: [
		"resume analysis",
		"job matching",
		"interview practice",
		"AI career platform",
		"HireSight",
	],
};

export default async function HomePage() {
	const cookieStore = await cookies();
	const hasToken = cookieStore.get("token");

	return (
		<div className="min-h-screen bg-background">
			<header className="border-b">
				<div className="max-w-6xl mx-auto flex justify-between items-center p-4">
					<h1 className="text-xl font-bold">
						<Link href="/">HireSight</Link>
					</h1>
					<div className="flex gap-4">
						<ThemeToggle />
						{!hasToken && (
							<Button asChild>
								<Link href="/login">Login</Link>
							</Button>
						)}
						<Button asChild variant={hasToken ? undefined : "outline"}>
							{hasToken ? (
								<Link href="/dashboard">Dashboard</Link>
							) : (
								<Link href="/signup">Get Started</Link>
							)}
						</Button>
					</div>
				</div>
			</header>

			<section className="max-w-6xl mx-auto px-4 py-20 text-center space-y-6">
				<h2 className="text-4xl font-bold leading-tight">
					AI-powered career clarity for students & freshers
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto">
					Upload your resume, discover job matches, and practice interviews
					with actionable AI feedback — all in one place.
				</p>

				<div className="flex justify-center gap-4">
					<Button size="lg" asChild>
						<Link href={hasToken ? "/dashboard" : "/signup"}>
							Analyze My Resume
						</Link>
					</Button>
					{!hasToken && (
						<Button size="lg" variant="outline" asChild>
							<Link href="/login">Login</Link>
						</Button>
					)}
				</div>
			</section>

			<section className="bg-muted py-16">
				<div className="max-w-6xl mx-auto px-4 space-y-10">
					<h3 className="text-2xl font-semibold text-center">
						How HireSight works
					</h3>

					<div className="grid md:grid-cols-3 gap-6">
						<Card>
							<CardContent className="p-6 space-y-2">
								<p className="font-medium">1. Upload Resume</p>
								<p className="text-sm text-muted-foreground">
									We analyze your resume using rule-based and AI logic.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6 space-y-2">
								<p className="font-medium">2. Match Jobs</p>
								<p className="text-sm text-muted-foreground">
									Discover roles that best fit your skills and profile.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6 space-y-2">
								<p className="font-medium">3. Practice Interviews</p>
								<p className="text-sm text-muted-foreground">
									Answer interview questions and get detailed AI
									feedback.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<section className="max-w-6xl mx-auto px-4 py-20 space-y-10">
				<h3 className="text-2xl font-semibold text-center">
					Why HireSight?
				</h3>

				<div className="grid md:grid-cols-3 gap-6">
					<Card>
						<CardContent className="p-6">
							<p className="font-medium">Explainable AI</p>
							<p className="text-sm text-muted-foreground mt-1">
								No black boxes. You see exactly why a job matches or
								not.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<p className="font-medium">Resume-first approach</p>
							<p className="text-sm text-muted-foreground mt-1">
								Everything revolves around improving your resume
								quality.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<p className="font-medium">Interview confidence</p>
							<p className="text-sm text-muted-foreground mt-1">
								Practice real questions and learn where you need
								improvement.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="border-t py-16">
				<div className="max-w-4xl mx-auto text-center space-y-4">
					<h3 className="text-2xl font-semibold">
						Ready to level up your career?
					</h3>
					<p className="text-muted-foreground">
						Get started with HireSight in minutes.
					</p>
					<Button size="lg" asChild>
						{hasToken ? (
							<Link href="/dashboard">Dashboard</Link>
						) : (
							<Link href="/signup">Get Started</Link>
						)}
					</Button>
				</div>
			</section>

			<footer className="text-center text-sm text-muted-foreground py-6">
				© {new Date().getFullYear()} HireSight. Built for learning & growth.
			</footer>
		</div>
	);
}
