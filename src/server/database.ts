export interface TaskAttributes{
id:number
title:string
description:string
createdAt:Date
updatedAt:Date
}
export interface TaskCreationAttributes extends Pick<TaskAttributes,'title'|'description'>{}
export interface TaskUpdateAttributes extends Partial<TaskCreationAttributes>{}
const globalForTasks = globalThis as unknown as { 
  tasks: TaskAttributes[] 
  nextId: number 
}
export const tasks:TaskAttributes[]=globalForTasks.tasks||[
{id:1, title:'Test', description:'Task for test', createdAt:new Date(), updatedAt:new Date()}]
globalForTasks.tasks=tasks