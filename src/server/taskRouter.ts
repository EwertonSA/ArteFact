import z from "zod";
import { taskSCreationSchema, taskUpdateSchema } from "./taskSchema";
import { publicProcedure, router } from "./trpc";
import { tasks } from "./database";

export const TaskRouter=router({
show:publicProcedure.query(()=>{
return tasks
}),
create:publicProcedure.input(taskSCreationSchema).mutation(({input})=>{
const now=new Date()
const newTask={
id:tasks.length?Math.max(...tasks.map(task=>task.id))+1:1, title:input.title, 
description:input.description,createdAt:now, updatedAt:now}
tasks.push(newTask)
return newTask
}),
update:publicProcedure.input(z.object({id:z.number(),data:taskUpdateSchema})).mutation(({input})=>{
const index=tasks.findIndex(task=>task.id===input.id)
if(index===-1)throw new Error('Task not found')
tasks[index]={
...tasks[index],
...input.data,
updatedAt:new Date()
}
return tasks[index]
}),
delete:publicProcedure.input(z.object({id:z.number()})).mutation(({input})=>{
const index=tasks.findIndex(task=>task.id===input.id)
if(index===-1)throw new Error('Task not found')
const [deletedTask]=tasks.splice(index,1)
return deletedTask
})
})
