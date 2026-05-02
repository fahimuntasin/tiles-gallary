import { toNextJsRequestResoler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

export const { GET, POST } = toNextJsRequestResoler(auth);