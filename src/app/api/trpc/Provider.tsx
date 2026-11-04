import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@/server/root";
import { TRPCReactProvider } from "./client";

export default function Providers({children}:{children:React.ReactNode}){
const [query]=useState(()=>new QueryClient())
const [trpcClient]=useState(()=>createTRPCClient<AppRouter>({links:[httpBatchLink({url:'/api/trpc'})]}))
return(

<QueryClientProvider client={query}>
<TRPCReactProvider trpcClient={trpcClient} queryClient={query}>{children}</TRPCReactProvider>    
</QueryClientProvider> 

)
}