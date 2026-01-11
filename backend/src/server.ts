import app from "./app";
import { connectMongo } from "./config/mongo";
import { connectPrisma } from "./config/prisma";
import { env } from "./config/env";

const PORT = env.PORT;

const start = async () => {
	await connectMongo();
	await connectPrisma();
	app.listen(PORT, () =>
		console.log(`Server running on http://localhost:${PORT}`)
	);
};

start();
