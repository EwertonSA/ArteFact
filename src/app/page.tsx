import { api } from "./api/trpc/server";
import { DeleteButton } from "@/Components/DeleteButton";
export const dynamic='force-dynamic'
export default async function Home() {
const tasks= await api.task.show()
return (
<>
<h1>Tasks</h1>
{tasks.length===0?(<p>There are not tasks available</p>):(
<ul>
{tasks.map((task)=>(
<li key={task.id}>
<strong>{task.title}</strong>
<p>{task.description}</p>
<small>Created at: {new Date(task.createdAt).toLocaleString()}</small>
<DeleteButton taskId={task.id}/>
</li>

))}
</ul>
)}
</>
);
}
