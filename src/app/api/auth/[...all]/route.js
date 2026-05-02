import { toNextJsHandler } from "better-auth/next-js";
import { authConfig } from "@/lib/auth";

export const { GET, POST } = toNextJsHandler(authConfig);