import { taskAction } from "./taskAction"
export  const NewTask=async()=>{

return(
<form action={taskAction}>
    <h2>New Task</h2>
    <label htmlFor="title">Title</label>
    <input id="title" name="title" type="text" />
        <label htmlFor="description">Title</label>
    <textarea id="description" name="description" />
    <button type="submit">Save</button>
</form>
)
}