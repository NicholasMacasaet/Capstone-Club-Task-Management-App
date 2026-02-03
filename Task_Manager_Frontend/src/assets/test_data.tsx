import { type Task, type Club, type ClubMembership, type TaskAssignment} from "../contexts/UserContext";



export const testTasks: Task[]= [
    {
        task_id:1,
        club_id:1,
        event_id:3,
        due_date: "2026-12-31",
        task_name: "Do thing 1",
        description:"This is a test description"
    },
    {
        task_id:2,
        club_id:1,
        event_id:3,
        due_date: "2026-11-30",
        task_name: "Do thing 2",
        description:"This is a test description"
    },
    {
        task_id:3,
        club_id:1,
        event_id:3,
        due_date: "2026-12-31",
        task_name: "Do thing 3",
        description:"This is a test description"
    },
]

export const taskAssignments: TaskAssignment[] = [
    {
        assigner: 2,
        assignee: 1,
        task_id: 1,
        accepted: false
    },
    {
        assigner: 2,
        assignee: 1,
        task_id: 2,
        accepted: true
    },
    {
        assigner: 2,
        assignee: 1,
        task_id: 3,
        accepted: false
    }

]

export const testClubs: Club[] = [
    {
        club_id: 1,
        name: "Test Club 1",
        description: "This is a test club"
    },
    {
        club_id: 2,
        name: "Test Club 2",
        description: "This is a test club"
    }

]

//1 and 2 are our only users for now

export const clubMemberships: ClubMembership[] = [
    {
        user_id: 1,
        club_id: 1,
    },
    {
        user_id: 2,
        club_id: 1,
    }
]


export const testUsers = [
    {
        user_id: 1,
        username: "AssigneeUser",
        email: ""
    },
    {
        user_id: 2,
        username: "AssignerUser",
        email: ""
    }
]
