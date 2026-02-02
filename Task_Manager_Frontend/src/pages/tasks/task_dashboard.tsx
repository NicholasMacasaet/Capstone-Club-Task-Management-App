import { Link } from "react-router-dom"
import { testTasks, taskAssignments} from "../../assets/test_data"
import type { Task } from "../../contexts/UserContext"

export const TaskDashboard = () => {

    //test data for testing rendering, replace this with actual data later
    //note to self, user_id=1 is our current user 
    const curr_user_id:number = 1

    // const unacceptedTasks: Task[] = testTasks.filter(task => {
    //     let flag:boolean = false
    //     taskAssignments.map(assignment => {
    //         //found assignment, check if it belongs to curr user
    //         if (assignment.task_id === task.task_id ){
    //             if (assignment.assignee === curr_user_id){
    //                 console.log(`assignment.assignee: ${assignment.assignee}, curr_user_id: ${curr_user_id}`)
    //                 flag = !assignment.accepted
    //             }
    //             else{
    //                 flag = false
    //             }
    //         }
    //     })
    //     return flag
    // })


    const tasks = (accepted:boolean)=>{
        const unacceptedTasks: Task[] = testTasks.filter(task => {
            let flag:boolean = false
            taskAssignments.map(assignment => {
                //found assignment, check if it belongs to curr user
                if (assignment.task_id === task.task_id ){
                    if (assignment.assignee === curr_user_id){
                        console.log(`assignment.assignee: ${assignment.assignee}, curr_user_id: ${curr_user_id}`)
                        flag = accepted ? assignment.accepted: !assignment.accepted
                    }
                    else{
                        flag = false
                    }
                }
            })
            return flag
        })

        return unacceptedTasks

    }

   

    return(<>
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex">
                <Link to="/orgs/landing" className="text-3xl justify-self-start self-start sm:self-center">
                        <p>←</p>
                </Link>

                <h1 className="landing_page_header w-full hidden sm:block justify-self-center">
                    Streamline
                </h1>
            </div>

            <p className="landing_page_header w-full text-4xl sm:hidden">
               Streamline
            </p>

            <div className="dashboard_wrapper h-full sm:h-3/4 w-full sm:w-3/4 flex justify-start rounded-xl flex-col mt-4">
                <p className="text-3xl">My Tasks</p>

                <div className="accept_container w-full h-1/4 flex flex-col mt-4">
                    <p className="text-xl self-start ml-2 mt-1">Tasks to Accept</p>
                    {tasks(false).map(task=>(
                        <div>
                            {task.task_name}
                        </div>
                    ))
                    }
                </div>

                <div className="current_tasks_container w-full h-full flex flex-col">
                    <p className="text-xl self-start ml-2 mt-1">Current Tasks</p>
                    {tasks(true).map(task=>(
                        <div>
                            {task.task_name}
                        </div>
                    ))
                    }
                </div>

            </div>

        </div>
    </>)
}