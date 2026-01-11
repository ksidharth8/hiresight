import { Request, Response } from "express";
import { createUser, validateUser } from "./auth.service.js";
import { prisma } from "../../config/prisma.js";
import { signToken } from "../../utils/jwt.js";
import { setAuthCookie, clearAuthCookie } from "../../config/cookies.js";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

export const signup = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) return res.status(409).json({ message: "Email exists" });

	const user = await createUser(name, email, password);
	const token = signToken(user.id);

	setAuthCookie(res, token);

	res.json({
		user: { id: user.id, name, email },
	});
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await validateUser(email, password);

	if (!user) return res.status(401).json({ message: "Invalid credentials" });

	const token = signToken(user.id);
	setAuthCookie(res, token);

	res.json({ success: true });
};

export const logout = async (_: Request, res: Response) => {
	clearAuthCookie(res);
	res.json({ success: true });
};

export const me = async (req: Request, res: Response) => {
	const user = await prisma.user.findUnique({
		where: { id: req.userId },
		select: { id: true, name: true, email: true },
	});

	res.json(user);
};
