'use client'
import { useTRPC } from "@/app/api/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const DeleteButton=({taskId}:{taskId:number})=>{
const trpc=useTRPC()
const router=useRouter()
const queryClient=useQueryClient()
//const [message, setMessage] = useState<string | null>(null)
const deleteTask= useMutation(trpc.task.delete.mutationOptions({onSuccess:()=>{
window.alert("Task deleted successfully!")
queryClient.invalidateQueries({queryKey:trpc.task.show.queryKey()})
router.refresh()

},
onError:(error)=>{
window.alert("Error while deleting this task!")
console.error(error)
}
}))
return(
<button onClick={()=>deleteTask.mutate({id:taskId})} disabled={deleteTask.isPending}>
{deleteTask.isPending? "Deleting the task":"Delete"}
</button>
)
}