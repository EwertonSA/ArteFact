'use server'
import { api } from "@/app/api/trpc/server"
import { notFound } from "next/navigation"
import { FormTask } from "../Form"

export interface EditTaskProps{
params:Promise<{id:string}>|{id:string}
}
export default async function({params}:EditTaskProps){
const resolved=await params
const taskId=Number(resolved.id)
const task=await api.task.getById({id:taskId})
if(!task)notFound()
return(<><FormTask initialData={task}/></>)
}