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
{id:1, title:'Test', description:'Task for test', createdAt:new Date(), updatedAt:new Date()},
{id:2, title:'Test2', description:'Task for test2', createdAt:new Date(), updatedAt:new Date()},
{id:3, title:'Test3', description:'Task for test3', createdAt:new Date(), updatedAt:new Date()},
{id:4, title:'Test4', description:'Task for test4', createdAt:new Date(), updatedAt:new Date()},
{id:5, title:'Test5', description:'Task for test5', createdAt:new Date(), updatedAt:new Date()},
{id:6, title:'Test6', description:'Task for test6', createdAt:new Date(), updatedAt:new Date()},
{id:7, title:'Test7', description:'Task for test7', createdAt:new Date(), updatedAt:new Date()},
{id:8, title:'Test8', description:'Task for test8', createdAt:new Date(), updatedAt:new Date()},
{id:9, title:'Test9', description:'Task for test9', createdAt:new Date(), updatedAt:new Date()},
{id:10, title:'Test10', description:'Task for test10', createdAt:new Date(), updatedAt:new Date()},
{id:11, title:'Test11', description:'Task for test11', createdAt:new Date(), updatedAt:new Date()}]
globalForTasks.tasks=tasks