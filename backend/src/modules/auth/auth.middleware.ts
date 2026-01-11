import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		const payload = jwt.verify(token, env.JWT_SECRET!) as {
			userId: string;
		};
		req.userId = payload.userId;
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
};
