import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import { env } from "./env.js";

const connectionString = `${env.POSTGRES_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

export async function connectPrisma() {
	try {
		await prisma.$connect();
		console.log("Prisma connected");
	} catch (error) {
		console.error("Error connecting to Prisma:", error);
		throw error;
	}
}
