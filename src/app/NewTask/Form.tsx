'use client'
import React, { useState } from "react"
import { taskAction } from "./taskAction"
import { useRouter } from "next/navigation"
import styles from './styles.module.css'
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/server/root"
type RouterOutput = inferRouterOutputs<AppRouter>;
type TaskItem = RouterOutput["task"]["getById"]
export interface TaskProps{
initialData?:TaskItem
}
export  const FormTask=({initialData}:TaskProps)=>{
const [title,setTitle]=useState(initialData?.title||'')
const [description,setDescription]=useState(initialData?.description||'')
const [message,setMessage]=useState<string|null>(null)
const [color,setColor]=useState<'red'|'green'>('red')
const [pending, setPending]=useState(false)
const router=useRouter()
const handleSubmit=async(ev:React.FormEvent<HTMLFormElement>)=>{
ev.preventDefault()
if(!title.trim()) 
{setMessage('The title field can not be empty') 
setColor("red")
return
}
setMessage(null)
setPending(true)
try {
const formData= new FormData()
if(initialData?.id) formData.append('id',initialData.id.toString())
formData.append('title',title)
formData.append('description',description)
const res=await taskAction(formData)
if(res&&!res.success){
setMessage(res.message)
setColor("red")
setPending(false)
}else{
setMessage(res!.message)
setColor('green')
}
setTimeout(() => {
router.push('/')
router.refresh()
}, 1000)
}catch (err) {
console.error(err)
const errorMessage = String(err)
if (errorMessage.includes('NEXT_REDIRECT')) {
return }
setMessage("An error occurred while saving the task.")
setPending(false)
}}
return(
<form onSubmit={handleSubmit} className={styles.main}>
{message && <p className={`${styles.statusMessage} ${color==='red'?styles.red:styles.green}`}>{message}</p>}
<div className={styles.card}>
<h2 className={styles.title}>{initialData?"Edit Task":"New Task"}</h2>
{initialData&&<input type="hidden" name="id" value={initialData.id}></input>}
<label htmlFor="title"/>Title:
<input id="title" name="title" type="text" required placeholder="Type the task title" 
value={title} onChange={(ev)=>setTitle(ev.target.value)}/>
<label htmlFor="description">Description:</label>
<textarea id="description" name="description" required placeholder="Type the task description" 
value={description} onChange={(ev)=>setDescription(ev.target.value)}/>
<button type="submit" className={styles.btn}>{pending?"Saving":initialData?"Update Task":"Create Task"}</button>
</div>
</form>
)
}