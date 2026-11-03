import { TaskRouter } from "./taskRouter";
import { router } from "./trpc";

export const app=router({task:TaskRouter})
export type AppRouter =typeof app