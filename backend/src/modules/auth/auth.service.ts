import { prisma } from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { AuthProvider } from "@prisma/client";

export const createUser = async (
	name: string,
	email: string,
	password?: string,
	provider: AuthProvider = "local",
) => {
	return prisma.user.create({
		data: {
			name,
			email,
			passwordHash: password ? await hashPassword(password) : null,
			provider,
		},
	});
};

export const validateUser = async (email: string, password: string) => {
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !user.passwordHash) return null;

	const isValid = await comparePassword(password, user.passwordHash);
	return isValid ? user : null;
};
