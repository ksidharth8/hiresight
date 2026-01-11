import { Response } from "express";

export function setAuthCookie(res: Response, token: string) {
	res.cookie("token", token, {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
}

export function clearAuthCookie(res: Response) {
	res.clearCookie("token");
}
