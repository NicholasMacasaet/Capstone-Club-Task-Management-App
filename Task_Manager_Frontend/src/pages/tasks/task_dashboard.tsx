import { Link, useParams } from "react-router-dom"
import { testTasks, taskAssignments, testUsers, testTasks2, testClubs} from "../../assets/test_data"
import type { Task } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUserContext } from "../../contexts/UserContext"
import { retrieveAssigners } from "../../misc_utils/retrieve_assigner"
import { FooterNav } from "../../components/footer_nav"

export const TaskDashboard = () => {

    const navigate = useNavigate()

    const {id} = useParams()

    const {isLoaded} = useUserContext()

    const [tasksToView, setTasksToView] = useState<Task[]>([])

    useEffect(() => {
        //trivial check to see if they're logged in or not 
        if (!isLoaded){
            navigate(`/`)
        }
        else {
            //replace with an actual backend call for tasks 
            const testTaskList: Task[] = testTasks.concat(testTasks2)
            let filteredTasksList: Task[] = []
            //filter by the specific clubs tasks
            testTaskList.map(task=>{
                if (id && (task.club_id === parseInt(id,10))){
                    filteredTasksList.push(task)
                }
            })
            setTasksToView(filteredTasksList)
        }
    },[isLoaded, id])


    //test data for testing rendering, replace this with actual data later
    //note to self, user_id=1 is our current user 
    //NOTE: REPLACE THIS LATER!!111!!1!1!1
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
     * retrieve tasks based on accepted status, filters tasks to display to the user if it is assigned to them 
     * @param accepted boolean indicating whether to retrieve accepted or unaccepted tasks
     * @returns array of tasks that are either accepted or unaccepted (depending on the flag)
     */
    const tasks = (accepted:boolean)=>{
        const unacceptedTasks: Task[] = tasksToView.filter(task => {
            let flag:boolean = false
            taskAssignments.map(assignment => {
                //found assignment, check if it belongs to curr user
                if (assignment.task_id === task.task_id ){
                    if (assignment.assignee === curr_user_id){
                        // console.log(`assignment.assignee: ${assignment.assignee}, curr_user_id: ${curr_user_id}`)
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

    const retrieveClubInfo = () => {
        //replace w/ api call later 
        if (id){
            const clubName: string = testClubs.find(club => club.club_id === parseInt(id,10))?.name || ""
            return clubName
        }
        else {
            return "If you see this something went wrong"
        }
    }

    const goToTaskCreation = ()=>{
        navigate('/new_task')
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
                <p className="text-3xl">My Tasks for {retrieveClubInfo()}</p>

                <div className="accept_container w-full h-1/4 flex flex-col mt-4">
                    <p className="text-xl self-start ml-2 mt-1">Tasks to Accept</p>
                    <div className="w-full h-full overflow-x-scroll flex flex-col items-center">
                    {tasks(false).map(task=>(
                        <div className="unaccepted_task_item h-fit w-7/8 rounded-xl flex flex-col sm:flex-row items-center">
                            <p className="text-sm sm:text-lg w-full sm:w-1/3 text-left font-bold">{task.task_name}</p>
                            <p className="sm:ml-3 text-xs sm:text-sm w-full sm:w-1/3 text-left">Assigned by {retrieveAssigners(task.task_id)}</p>
                            <button className="task_accept_small sm:task_accept_button sm:ml-auto text-center flex items-center justify-center rounded-xl mt-1">Accept</button>
                            {/* <button className="block sm:hidden task_accept_small ml-auto flex items-center justify-center">✓</button> */}
                        </div>
                    ))
                    }
                    </div>
                </div>

                <div className="current_tasks_container w-full grow flex flex-col">
                    <div className="current_tasks_header w-full flex justify-between items-center">
                        <p className="text-xl self-start ml-2 mt-1">Current Tasks</p>
                        <button className="task_create_button flex justify-center items-center p-1" onClick={goToTaskCreation}>+</button>
                    </div>

                    <div className="w-full h-full overflow-x-scroll flex flex-col items-center">
                        {tasks(true).map(task=>(
                            <div className="unaccepted_task_item w-7/8 h-1/4 sm:h-fit rounded-xl flex flex-col sm:flex-row justify-between sm:justify-start items-center">
                                <div className="flex flex-row sm:flex-col items-center sm:items-start w-full sm:w-1/3 justify-between sm:justify-start">
                                    <p className="text-sm sm:text-lg font-bold">{task.task_name}</p>
                                    <p className="text-xs sm:text-sm">Due: {task.due_date}</p>
                                </div>
                                <p className="ml-3 text-xs sm:text-sm w-full sm:w-1/3 text-left">Assigned by {retrieveAssigners(task.task_id)}</p>
                                <select className="task_accept_select sm:ml-auto rounded-xl text-sm">
                                    <option value="todo">To-Do</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
            <FooterNav/>
        </div>
    </>)
}