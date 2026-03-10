import { type Task, type Club, type ClubMembership, type TaskAssignment, type user} from "../contexts/UserContext";



export const testTasks: Task[] = [
    {
        task_id:1,
        club_id:1,
        due_date: "2026-12-31",
        task_name: "Do thing 1",
        attachments: null,
        description:"This is a test description for task 1 "
    },
    {
        task_id:2,
        club_id:1,
        due_date: "2026-03-12",
        task_name: "Do thing 2",
        attachments: null,
        description:"This is a test description for task 2"
    },
    {
        task_id:3,
        club_id:1,
        due_date: "2026-03-12",
        task_name: "Do thing 3",
        attachments: null,
        description:"This is a test description for task 3"
    },
]


export const testTasks2: Task[] = [
    {
        task_id:4,
        club_id:2,
        due_date: "1999-12-31",
        task_name: "Do thing 4",
        attachments: null,
        description:"This is a test description for task 4"
    },
    {
        task_id:5,
        club_id:2,
        due_date: "1999-12-10",
        task_name: "Do thing 5",
        attachments: null,
        description:"This is a test description for task 5"
    },
    {
        task_id:6,
        club_id:2,
        due_date: "1999-12-15",
        task_name: "Do thing 6",
        attachments: null,
        description:"This is a test description for task 6"
    },
]

export const testTasksTotal: Task[]= testTasks.concat(testTasks2)


export const taskAssignments: TaskAssignment[] = [
    {
        assigner: 2,
        assignee: 1,
        task_id: 1,
        status: "Needs Acceptance",
        accepted: false
    },
    {
        assigner: 2,
        assignee: 1,
        task_id: 2,
        status: "To-Do",
        accepted: true
    },
    {
        assigner: 2,
        assignee: 1,
        task_id: 3,
        status: "Needs Acceptance",
        accepted: false
    },

    {
        assigner: 2,
        assignee: 1,
        task_id: 4,
        status: "To-Do",
        accepted: true
    },
    {
        assigner: 2,
        assignee: 1,
        task_id: 5,
        status: "To-Do",
        accepted: true
    },
    {
        assigner: 2,
        assignee: 1,
        task_id: 6,
        status: "To-Do",
        accepted: true
    }

]

export const testClubs: Club[] = [
    {
        club_id: 1,
        name: "Test Club 1",
        description: "This is a test club 1"
    },
    {
        club_id: 2,
        name: "Test Club 2",
        description: "This is a test club 2"
    },
    {
        club_id: 3,
        name: "Test Club 3",
        description: "This is a test club 3"
    }
]

//1 and 2 are our only users for now

export const clubMemberships: ClubMembership[] = [
    {
        user_id: 1,
        club_id: 1,
        //subteam_assignment: finance
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
    },
    {
        user_id: 3,
        username: "AnotherUser",
        email: "AssignerUser3@test.com",
        phone_number: "555-555-5555"
    }
]

// export const defaultNonLoadedUser: user = 
//     {
//         user_id: -1,
//         username: "DefaultUser",
//         email: "wrong.com",
//         phone_number: "888-888-8888"
//     }
