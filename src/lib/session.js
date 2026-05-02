import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const getSession = async () => {
  return await getServerSession(auth);
};

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user;
};