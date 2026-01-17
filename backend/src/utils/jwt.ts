import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";
import { env } from "../config/env.js";

const JWT_SECRET: Secret = env.JWT_SECRET;
const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN as StringValue;

export const signToken = (userId: string, userRole: string): string => {
	const options: SignOptions = {
		expiresIn: JWT_EXPIRES_IN,
	};

	return jwt.sign({ userId: userId, role: userRole }, JWT_SECRET, options);
};
