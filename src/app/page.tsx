import { api } from "./api/trpc/server";
import Link from "next/link";
import styles from './styles.module.css'
import { TaskList } from "@/Components/TaskList";
export const dynamic='force-dynamic'
export default async function Home() {
const initialData= await api.task.show({limit:10})
return (
<div className={styles.main}>
<h1 className={styles.title}>Tasks</h1>
<div className={styles.new}>
<Link href={'/NewTask'}><button className={`${styles.editBtn} ${styles.btnNew}`}>New Task</button></Link>
</div>
{initialData.tasks.length===0?(<p>There are no tasks available</p>):(
<TaskList initialData={initialData}/>
)
}</div>
  );
}
