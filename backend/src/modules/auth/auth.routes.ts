import { Router } from "express";
import passport from "passport";
import { signup, login, me, logout } from "./auth.controller";
import { authMiddleware } from "./auth.middleware";
import { signToken } from "../../utils/jwt";
import { setAuthCookie } from "../../config/cookies";

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

    res.redirect("http://localhost:3000/dashboard");
  }
);

// Failure route
router.get("/google/failure", (_req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
});


export default router;
