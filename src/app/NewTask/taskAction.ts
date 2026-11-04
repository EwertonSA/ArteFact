'use server'
import { api } from "@/app/api/trpc/server"
import { redirect } from "next/navigation"
export const taskAction=async( formdata:FormData)=>{
const title= formdata.get('title')?.toString()||''
const description= formdata.get('description')?.toString()||''
if(!title||!description) throw new Error("You should provide all necessary data to create a task")
const newTask= await api.task.create({title,description})
if(newTask){
redirect('/')
}
}