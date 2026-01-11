import dotenv from "dotenv";
dotenv.config();

export const env = {
	PORT: process.env.PORT!,
	NODE_ENV: process.env.NODE_ENV!,
	MONGODB_URI: process.env.MONGODB_URI!,
	PAWAN_API_KEY: process.env.PAWAN_API_KEY!,
	POSTGRES_URL: process.env.POSTGRES_URL!,
	JWT_SECRET: process.env.JWT_SECRET!,
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
	GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL!,
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};
