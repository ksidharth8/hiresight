import app from "./app.js";
import { connectMongo } from "./config/mongo.js";
import { connectPrisma } from "./config/prisma.js";
import { env } from "./config/env.js";

const PORT = env.PORT;

const start = async () => {
	await connectMongo();
	await connectPrisma();
	app.listen(PORT, () => console.log(`Server running on ${env.BACKEND_URL}`));
};

start();
