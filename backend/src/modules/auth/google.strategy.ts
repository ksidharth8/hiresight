import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../../config/prisma.js";
import { env } from "../../config/env.js";

passport.use(
	new GoogleStrategy(
		{
			clientID: env.GOOGLE_CLIENT_ID!,
			clientSecret: env.GOOGLE_CLIENT_SECRET!,
			callbackURL: env.GOOGLE_CALLBACK_URL!,
		},
		async (_accessToken, _refreshToken, profile, done) => {
			try {
				const email = profile.emails?.[0]?.value;
				if (!email) return done(new Error("No email from Google"));

				let user = await prisma.user.findUnique({ where: { email } });

				if (!user) {
					user = await prisma.user.create({
						data: {
							name: profile.displayName,
							email,
							provider: "google",
						},
					});
				}
				return done(null, user);
			} catch (err) {
				console.error("Google Strategy Error:", err);
				done(err as Error);
			}
		},
	),
);
