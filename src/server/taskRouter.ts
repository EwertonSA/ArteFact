import z from "zod";
import { taskSCreationSchema, taskUpdateSchema } from "./taskSchema";
import { publicProcedure, router } from "./trpc";
import { tasks } from "./database";

export const TaskRouter=router({
show:publicProcedure.query(()=>{
return tasks
}),
getById:publicProcedure.input(z.object({id:z.number()})).query(({input})=>{
const task=tasks.find((task)=>task.id===input.id)
return task||null
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
console.log("=== ENTRARAM OS DADOS NO UPDATE DO TRPC ===", input)
const index=tasks.findIndex(task=>task.id===input.id)
console.log("Índice encontrado:", index);
if(index===-1)throw new Error('Task not found')
tasks[index]={
...tasks[index],
...input.data,
updatedAt:new Date()
}
console.log("Tarefa atualizada com sucesso:", tasks[index]);
return tasks[index]
}),
delete:publicProcedure.input(z.object({id:z.number()})).mutation(({input})=>{
const index=tasks.findIndex(task=>task.id===input.id)
if(index===-1)throw new Error('Task not found')
const [deletedTask]=tasks.splice(index,1)
return deletedTask
})
})
