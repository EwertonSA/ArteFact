import { app } from "@/server/root"
import { createCallerFactory } from "@/server/trpc"


const createCaller=createCallerFactory(app)
export const api=createCaller({})