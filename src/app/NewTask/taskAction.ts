'use server'
import { api } from "@/app/api/trpc/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
export const taskAction=async( formdata:FormData)=>{
try {
const id=Number(formdata.get('id'))
const title= formdata.get('title')?.toString()||''
const description= formdata.get('description')?.toString()||''

if(!title.trim()||!description.trim()) return{success:false,message:"All fields are required"}
if(id){
await api.task.update({id,data:{title,description}})
revalidatePath(`/NewTask/${id}`)
}else{
await api.task.create({title,description})}
revalidatePath('/')
return { success: true, message: "Task saved successfully!" }
}catch (error) {
console.error("Server Action Error:", error)
return { 
success: false, 
message: "An unexpected error occurred on the server." 
}    
}
}