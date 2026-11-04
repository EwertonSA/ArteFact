import { app } from "@/server/root"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

const handler=(req:Request)=>{
return fetchRequestHandler({endpoint:'/api/trpc', req, router:app, createContext: ()=>({}),})
}
export { handler as GET, handler as POST }