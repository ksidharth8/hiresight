import { Router } from "express";
import passport from "passport";
import { signup, login, me, logout } from "./auth.controller.js";
import { authMiddleware } from "./auth.middleware.js";
import { signToken } from "../../utils/jwt.js";
import { setAuthCookie } from "../../config/cookies.js";
import { env } from "../../config/env.js";

const router = Router();

// POST /api/auth/signup
router.post("/signup", signup);
// POST /api/auth/login
router.post("/login", login);
// POST /api/auth/logout
router.post("/logout", logout);
// GET /api/auth/me
router.get("/me", authMiddleware, me);

// Google OAuth routes
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route
router.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false,
		failureRedirect: "/api/auth/google/failure",
	}),
	(req: any, res) => {
		const token = signToken(req.user.id);
		setAuthCookie(res, token);

		res.redirect(env.FRONTEND_URL);
	}
);

// Failure route
router.get("/google/failure", (_req, res) => {
	res.status(401).json({ message: "Google authentication failed" });
});

export default router;
