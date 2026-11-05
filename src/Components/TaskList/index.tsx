'use client';

import { useTRPC } from "@/app/api/trpc/client"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { DeleteButton } from "@/Components/DeleteButton"
import Link from "next/link"
import styles from '../../app/styles.module.css'
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@/server/root"

type RouterOutput = inferRouterOutputs<AppRouter>;
type TaskShowOutput = RouterOutput["task"]["show"];

type TaskListProps = {
  initialData: TaskShowOutput;
};
export const TaskList = ({ initialData }:TaskListProps) => {
const trpc = useTRPC()
const queryClient = useQueryClient()
const queryOptions=trpc.task.show.infiniteQueryOptions({limit:10}, {
getNextPageParam: (lastPage) => lastPage.nextCursor,
})
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
...queryOptions,
initialData: {
pages: [initialData],
pageParams: [null as number | null]
},
getNextPageParam: (lastPage: any) => lastPage.nextCursor,})
const observerTarget = useRef(null)
 useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage()
        }
      },
      { threshold: 1.0 }
    )

    const target = observerTarget.current

    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const tasks = data?.pages.flatMap(page => page.tasks) || []

  return (
    <>
      {tasks.length === 0 ? (
        <p>There are no tasks available</p>
      ) : (
        <ul className={styles.tasks}>
          {tasks.map(task => (
            <li key={task.id} className={styles.task}>
              <div className={styles.taskInfo}>
                <p><strong>Task Title:</strong> {task.title}</p>
                <p><strong>Task Description:</strong> {task.description}</p>
                <small>
                  <strong>Created at:</strong>{" "}
                  {new Date(task.createdAt).toISOString()}
                </small>
              </div>

              <div className={styles.taskActions}>
                <Link href={`/NewTask/${task.id}`}>
                  <button className={styles.editBtn}>Edit</button>
                </Link>

                <DeleteButton taskId={task.id} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        ref={observerTarget}
        style={{ height: '20px', margin: '20px 0' }}
      />

      {isFetchingNextPage && <p>Loading Tasks</p>}

      {!hasNextPage && tasks.length > 0 && (
        <p>You are at the end of the list!</p>
      )}
    </>
  )
}