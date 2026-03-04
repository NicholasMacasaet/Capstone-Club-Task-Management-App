import type { Task } from "../contexts/UserContext"

export const chronoSortTasks = (tasks: Task[]): Task[] => {
    const sortedTasks = tasks.sort((a, b) => {
        const dateA = new Date(a.due_date)
        const dateB = new Date(b.due_date)

        return dateA.getTime() - dateB.getTime()
    })
    return sortedTasks
}