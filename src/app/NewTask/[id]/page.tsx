'use server'
import { api } from "@/app/api/trpc/server"
import { notFound } from "next/navigation"
import { FormTask } from "../Form"
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/root";
type RouterOutput = inferRouterOutputs<AppRouter>;
type TaskItem = RouterOutput["task"]["show"]["tasks"][number]
export interface EditTaskProps{
params:TaskItem
}
export default async function({params}:EditTaskProps){
const resolved=await params
const taskId=Number(resolved.id)
const task=await api.task.getById({id:taskId})
if(!task)notFound()
return(<><FormTask initialData={task}/></>)
}