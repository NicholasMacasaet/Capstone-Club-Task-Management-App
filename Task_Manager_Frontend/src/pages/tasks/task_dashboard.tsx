import { Link } from "react-router-dom"
import { testTasks, taskAssignments, testUsers} from "../../assets/test_data"
import type { Task, TaskAssignment } from "../../contexts/UserContext"

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

    /**
     * retrieve tasks based on accepted status
     * @param accepted boolean indicating whether to retrieve accepted or unaccepted tasks
     * @returns array of tasks that are either accepted or unaccepted (depending on the flag)
     */
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
    //note to self, modify later to render multiple assignees
    //retrieve the usernames of assigners for a given task
    /**
     * retrieve the assigner's username for a given task (assuming one assigner per task for now)
     * @param task_id the id of the task to retrieve the assigner for
     * @returns the username of the assigner (and multiple assigners in the future) returns "Something went wrong" if no assigner found
     */
    const retrieveAssigners = (task_id:number) => {

        const assignment:TaskAssignment = taskAssignments.find(assignment => assignment.task_id === task_id)!;
        //note to self the assigner could be an array of numbers at some point so i need to iterate over that to list all of the assigners
        if (assignment) {
            const assigner_id = assignment.assigner;
            const assigner = testUsers.find(user => user.user_id === assigner_id);
            return assigner ? assigner.username : "Unknown";
        }
        return "Something went wrong";

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

            <div className="dashboard_wrapper h-full sm:h-7/8 w-full sm:w-3/4 flex justify-start rounded-xl flex-col mt-4">
                <p className="text-3xl">My Tasks</p>

                <div className="accept_container w-full h-1/4 flex flex-col mt-4">
                    <p className="text-xl self-start ml-2 mt-1">Tasks to Accept</p>
                    <div className="w-full h-full overflow-x-scroll flex flex-col items-center">
                    {tasks(false).map(task=>(
                        <div className="unaccepted_task_item h-fit w-7/8 rounded-xl flex flex-col sm:flex-row items-center">
                            <p className="text-sm sm:text-lg w-full sm:w-1/3 text-center sm:text-left font-bold">{task.task_name}</p>
                            <p className="ml-3 text-xs sm:text-sm w-full sm:w-1/3 text-center sm:text-left">Assigned by {retrieveAssigners(task.task_id)}</p>
                            <button className="task_accept_small sm:task_accept_button sm:ml-auto text-center flex items-center justify-center">Accept</button>

                            {/* <button className="block sm:hidden task_accept_small ml-auto flex items-center justify-center">✓</button> */}
                        </div>
                    ))
                    }
                    </div>
                </div>

                <div className="current_tasks_container w-full grow flex flex-col">
                    <p className="text-xl self-start ml-2 mt-1">Current Tasks</p>

                    <div className="w-full h-full overflow-x-scroll flex flex-col items-center">
                        {tasks(true).map(task=>(
                            <div className="unaccepted_task_item w-7/8 h-1/4 sm:h-fit rounded-xl flex flex-col sm:flex-row justify-between sm:justify-start items-center">
                                <div className="flex flex-row sm:flex-col items-center sm:items-start w-full sm:w-1/3 justify-between sm:justify-start">
                                    <p className="text-sm sm:text-lg font-bold">{task.task_name}</p>
                                    <p className="text-xs sm:text-sm">Due: {task.due_date}</p>
                                </div>
                                <p className="ml-3 text-xs sm:text-sm w-full sm:w-1/3 text-left">Assigned by {retrieveAssigners(task.task_id)}</p>
                                <select className="task_accept_select sm:ml-auto rounded-xl text-sm">
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        ))
                        }
                    </div>
                </div>

            </div>

        </div>
    </>)
}