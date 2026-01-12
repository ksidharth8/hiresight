import { Response } from "express";
import { env } from "./env.js";

export function setAuthCookie(res: Response, token: string) {
	res.cookie("token", token, {
		httpOnly: true,
		secure: env.NODE_ENV === "production" ? true : false,
		sameSite: env.NODE_ENV === "production" ? "none" : "lax",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
}

export function clearAuthCookie(res: Response) {
	res.clearCookie("token");
}
