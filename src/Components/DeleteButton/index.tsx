'use client'
import { useTRPC } from "@/app/api/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from './styles.module.css'
export const DeleteButton=({taskId}:{taskId:number})=>{
const trpc=useTRPC()
const router=useRouter()
const queryClient=useQueryClient()
const [message, setMessage] = useState<string | null>(null)
const [color,setColor]=useState<'red'|'green'>('red')
const deleteTask= useMutation(trpc.task.delete.mutationOptions({onSuccess:()=>{
setMessage("Task deleted successfully!")
setColor('green')
queryClient.invalidateQueries({queryKey:trpc.task.show.queryKey()})
setTimeout(() => {
router.refresh()
}, 1000)
},
onError:(error)=>{
window.alert("Error while deleting this task!")
console.error(error)
setMessage("Error while deleting this task")
setColor('red')
}
}))
return(
<div>
<div  className={styles.message}>
{message && (
<p className={`${styles.deleteMessage} ${color==='red'?styles.red:styles.green}`}>
{message}
</p>
)}
</div>
<button className={styles.btn}
onClick={() => deleteTask.mutate({ id: taskId })} 
disabled={deleteTask.isPending}
style={{ cursor: deleteTask.isPending ? "not-allowed" : "pointer" }}
>
{deleteTask.isPending ? "Deleting the task..." : "Delete"}
</button>
</div>
)
}