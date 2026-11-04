import { AppRouter } from "@/server/root";
import { createTRPCContext } from "@trpc/tanstack-react-query";

export const { TRPCProvider: TRPCReactProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>()