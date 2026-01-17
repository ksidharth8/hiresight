import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
			isAdmin?: boolean;
		}
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		const payload = jwt.verify(token, env.JWT_SECRET!) as {
			userId: string;
			role: "student" | "admin";
		};
		req.userId = payload.userId;
		req.isAdmin = payload.role === "admin";
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
};

export async function requireAdmin(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (!req.userId) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	if (!req.isAdmin) {
		return res
			.status(403)
			.json({ message: "Forbidden, admin access required" });
	}
	next();
}
