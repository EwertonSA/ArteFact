import z from "zod";
import { taskSCreationSchema, taskUpdateSchema } from "./taskSchema";
import { publicProcedure, router } from "./trpc";
import { tasks } from "./database";

export const TaskRouter=router({
show:publicProcedure.input(z.object({limit: z.number().min(1).max(50).default(10), 
cursor: z.number().optional().nullable(),})).query(async({input})=>{
const {limit,cursor}=input
let startIndex = 0
if (cursor) {
const cursorIndex = tasks.findIndex((task) => task.id === cursor);
if (cursorIndex !== -1) {
startIndex = cursorIndex + 1
}
}
const fetchedTasks = tasks.slice(startIndex, startIndex + limit + 1);
let nextCursor: number | null = null
if (fetchedTasks.length > limit) {
fetchedTasks.pop()
const lastItem = fetchedTasks[fetchedTasks.length - 1]
nextCursor = lastItem ? lastItem.id : null
}
const serializedTasks = fetchedTasks.map((task) => ({
...task,
createdAt: task.createdAt instanceof Date ? task.createdAt.toISOString() : task.createdAt,
updatedAt: task.updatedAt instanceof Date ? task.updatedAt.toISOString() : task.updatedAt,
}));

return {
tasks: serializedTasks,
nextCursor,
};
}),

getById:publicProcedure.input(z.object({id:z.number()})).query(({input})=>{
const task=tasks.find((task)=>task.id===input.id)
if (!task) return null
return {
...task,
createdAt: task.createdAt instanceof Date ? task.createdAt.toISOString() : task.createdAt,
updatedAt: task.updatedAt instanceof Date ? task.updatedAt.toISOString() : task.updatedAt,
}
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
