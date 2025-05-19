import { RateLimiterRedis } from "rate-limiter-flexible";
import { Redis } from "ioredis";
import type { Handle } from "@sveltejs/kit";

//-------------------------------------------------------
// Redis Client Initialization
//-------------------------------------------------------
const redisClient = new Redis(import.meta.env.VITE_REDIS_HOST);

redisClient.on("error", (err) => console.error("Redis Error:", err));

console.log("ioredis client initialized");

redisClient.on("ready", () => {
	console.log("ioredis client is ready");
});

//-------------------------------------------------------
// Global Rate Limiting Configuration (using Redis)
//-------------------------------------------------------
const rateLimiter = new RateLimiterRedis({
	storeClient: redisClient,
	points: 100,
	duration: 60,
	blockDuration: 10,
});

//-------------------------------------------------------
// Server Handle Hook with Global Rate Limit
//-------------------------------------------------------
export const handle: Handle = async ({ event, resolve }) => {
	const clientAddress = event.getClientAddress();

	try {
		await rateLimiter.consume(clientAddress);
		const response = await resolve(event);
		return response;
	} catch (rateLimiterRes) {
		console.warn(`Global rate limit exceeded for IP: ${clientAddress}`);
		return new Response("Too Many Requests", {
			status: 429,
			headers: {
				"Retry-After": String((rateLimiterRes as any).msBeforeNext / 1000),
			},
		});
	}
};
