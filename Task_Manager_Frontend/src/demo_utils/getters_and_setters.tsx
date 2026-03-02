import type { Club, ClubMembership, Task, TaskAssignment, user } from "../contexts/UserContext";

export const setTestUsers = (users: user[])=>{
    localStorage.setItem("test_users", JSON.stringify(users))
}

export const retrieveAndParseTestUsers = (): user[] => {
    const raw_user_data: string | null = localStorage.getItem("test_users")

    let retrieved_users: user[] = []

    if (raw_user_data !== null) {
        retrieved_users = JSON.parse(raw_user_data)
    }
    return retrieved_users
}

export const setTestTasks = (tasks: Task[])=>{
    localStorage.setItem("total_test_tasks", JSON.stringify(tasks))
}

export const retrieveAndParseTestTasks = (): Task[] => {
    const raw_task_data: string | null = localStorage.getItem("total_test_tasks")

    let retrieved_tasks: Task[] = []

    if (raw_task_data !== null) {
        retrieved_tasks = JSON.parse(raw_task_data)
    }
    return retrieved_tasks
}

export const setTestTaskAssignments = (task_assignments: TaskAssignment[])=>{
    localStorage.setItem("test_task_assignments", JSON.stringify(task_assignments))
}

export const retrieveAndParseTestTaskAssignments = (): TaskAssignment[] => {
    const raw_task_assignment_data: string | null = localStorage.getItem("test_task_assignments")

    let retrieved_task_assignments: TaskAssignment[] = []

    if (raw_task_assignment_data !== null) {
        retrieved_task_assignments = JSON.parse(raw_task_assignment_data)
    }
    return retrieved_task_assignments
}

export const setTestClubs = (clubs: Club[])=>{
    localStorage.setItem("test_clubs", JSON.stringify(clubs))
}

export const retrieveAndParseTestClubs = (): Club[] => {
    const raw_club_data: string | null = localStorage.getItem("test_clubs")

    let retrieved_clubs: Club[] = []

    if (raw_club_data !== null) {
        retrieved_clubs = JSON.parse(raw_club_data)
    }
    return retrieved_clubs
}

export const setTestClubMemberships = (club_memberships: ClubMembership[])=>{
    localStorage.setItem("test_club_memberships", JSON.stringify(club_memberships))
}

export const retrieveAndParseTestClubMemberships = (): ClubMembership[] => {
    const raw_club_membership_data: string | null = localStorage.getItem("test_club_memberships")

    let retrieved_club_memberships: ClubMembership[] = []

    if (raw_club_membership_data !== null) {
        retrieved_club_memberships = JSON.parse(raw_club_membership_data)
    }
    return retrieved_club_memberships
}

export const setCurrClubIDLocalStorage = (club_id: number) => {
    localStorage.setItem("curr_club_id", JSON.stringify(club_id))
}

export const retrieveAndParseCurrClubID = (): number | null => {
    const raw_curr_club_id_data: string | null = localStorage.getItem("curr_club_id")

    let retrieved_curr_club_id: number | null = null

    if (raw_curr_club_id_data !== null) {
        retrieved_curr_club_id = JSON.parse(raw_curr_club_id_data)
    }
    return retrieved_curr_club_id
}

export const setCurrUserLocalStorage = (user: user) => {
    localStorage.setItem("curr_user", JSON.stringify(user))
}

export const retrieveAndParseCurrUser = (): user | null => {
    const raw_curr_user_data: string | null = localStorage.getItem("curr_user")

    let retrieved_curr_user: user | null = null

    if (raw_curr_user_data !== null) {
        retrieved_curr_user = JSON.parse(raw_curr_user_data)
    }
    return retrieved_curr_user
}