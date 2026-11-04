import { api } from "./api/trpc/server";
import { DeleteButton } from "@/Components/DeleteButton";
import Link from "next/link";
import styles from './styles.module.css'
export const dynamic='force-dynamic'
export default async function Home() {
const tasks= await api.task.show()
return (
<div className={styles.main}>
<h1 className={styles.title}>Tasks</h1>
<div className={styles.new}>
<Link href={'/NewTask'}><button className={`${styles.editBtn} ${styles.btnNew}`}>New Task</button></Link>
</div>
{tasks.length===0?(<p>There are no tasks available</p>):(
<ul className={styles.tasks}>
{tasks.map((task)=>(
<li key={task.id} className={styles.task}>
<div className={styles.taskInfo}>
<p><strong>Task Title:</strong> {task.title}</p>
<p><strong>Task Description:</strong> {task.description}</p>
<small><strong>Created at:</strong> {new Date(task.createdAt).toLocaleString()}</small>
</div>
<div className={styles.taskActions}>
<Link href={`/NewTask/${task.id}`}><button className={styles.editBtn}>Edit</button></Link>
<DeleteButton taskId={task.id}/>
</div>

</li>

))}
</ul>
)}
</div>
);
}
