import { type Task, type Club, type ClubMembership, type TaskAssignment, type user} from "../contexts/UserContext";



export const testTasks: Task[] = [
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


export const testTasks2: Task[] = [
    {
        task_id:4,
        club_id:2,
        event_id:3,
        due_date: "1999-12-31",
        task_name: "Do thing 4",
        description:"This is a test description"
    },
    {
        task_id:5,
        club_id:2,
        event_id:3,
        due_date: "1999-12-31",
        task_name: "Do thing 5",
        description:"This is a test description"
    },
    {
        task_id:6,
        club_id:2,
        event_id:3,
        due_date: "1999-12-31",
        task_name: "Do thing 6",
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
    },

    {
        assigner: 2,
        assignee: 1,
        task_id: 4,
        accepted: true
    },
    {
        assigner: 2,
        assignee: 1,
        task_id: 5,
        accepted: true
    },
    {
        assigner: 2,
        assignee: 1,
        task_id: 6,
        accepted: true
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
        user_id: 1,
        club_id: 2,
    },
    {
        user_id: 2,
        club_id: 1,
    },
    {
        user_id: 2,
        club_id: 2,
    }
]


export const testUsers: user[]= [
    {
        user_id: 1,
        username: "AssigneeUser",
        email: "AssigneeUser1@test.com",
        phone_number: "404-404-4040"
    },
    {
        user_id: 2,
        username: "AssignerUser",
        email: "AssignerUser2@test.com",
        phone_number: "555-555-5555"
    }
]
