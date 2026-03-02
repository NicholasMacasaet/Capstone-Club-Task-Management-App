import { Link, useFetcher, useParams } from "react-router-dom"
import type { Club, Task, TaskAssignment, user } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUserContext } from "../../contexts/UserContext"
import { retrieveAssigners } from "../../misc_utils/retrieve_assigner"
import { FooterNav } from "../../components/footer_nav"
import editIcon from "../../assets/edit-button-svgrepo-com.svg" 
import { retrieveAndParseCurrUser, retrieveAndParseTestClubs, retrieveAndParseTestTaskAssignments, retrieveAndParseTestTasks, setTestTaskAssignments } from "../../demo_utils/getters_and_setters"

export const TaskDashboard = () => {

    const navigate = useNavigate()

    const {id} = useParams()

    const {isLoaded, testDataLoaded, consoleLogDebug} = useUserContext()

    const [currUser, setCurrUser] = useState<user>()
    
    const [loadedTasks, setLoadedTasks] = useState<Task[]>([])

    const [filteredTasksToView, setFilteredTasksToView] = useState<Task[]>([])

    //demo code 
    const [loadedTaskAssignments, setLoadedTaskAssignments] = useState<TaskAssignment[]>([])

    const [loadedClubs, setLoadedClubs] = useState<Club[]>([])
    //end demo setters
    

    useEffect(() => {
        //trivial check to see if they're logged in or not 
        if (!isLoaded){
            navigate(`/`)
        }
        else {
            if (loadedTasks.length === 0) return

            //replace with an actual backend call for tasks 
            let filteredTasksList: Task[] = []
            //filter by the specific clubs tasks
            loadedTasks.map(task => {
                if (id && (task.club_id === parseInt(id,10))){
                    filteredTasksList.push(task)
                }
            })
            setFilteredTasksToView(filteredTasksList)
        }
    },[isLoaded, id, loadedTasks])

    /**
     * A function for simulating calling/retrieving information from the database by retrieving the test data I've made from localStorage
     */
    const loadFromCache = () => {

        const task_data: Task[] = retrieveAndParseTestTasks()
        const club_data: Club[] = retrieveAndParseTestClubs()
        const task_assignment_data: TaskAssignment[] = retrieveAndParseTestTaskAssignments()
        const curr_user: user | null= retrieveAndParseCurrUser()

        if (task_data.length > 0){
            setLoadedTasks(task_data)
        }

        if (club_data.length > 0){
            setLoadedClubs(club_data)
        }

        if (task_assignment_data.length > 0){
            setLoadedTaskAssignments(task_assignment_data)
        }

        if (curr_user !== null){
            setCurrUser(curr_user)
        }
    }

    useEffect(() => {

        //DEMO: This will be replaced with a function that will actually call the db
        //replace this later with your own function for loading information from your database
        loadFromCache()

    }, [testDataLoaded])

    const demoAcceptTask = (task_id: number) => {
        //replace with actual api call to update the task assignment to accepted in the database

        console.log("previous task assignments: ", JSON.stringify(loadedTaskAssignments, null, 2))
        let updatedTaskAssignments: TaskAssignment[] = []
         loadedTaskAssignments.map(assignment => {
            const currAssignment:TaskAssignment = {...assignment}
            if (currAssignment.task_id === task_id && currAssignment.assignee === currUser?.user_id){
                currAssignment.accepted = true
                currAssignment.status = "to-do"
            }
            updatedTaskAssignments.push(currAssignment)
        })
        setLoadedTaskAssignments(updatedTaskAssignments)
        setTestTaskAssignments(updatedTaskAssignments)
    }

    const demoUpdateTaskStatus = (task_id: number, new_status: string) => {
        //replace with actual api call to update the task assignment status in the database

        let updatedTaskAssignments: TaskAssignment[] = []
         loadedTaskAssignments.map(assignment => {
            const currAssignment:TaskAssignment = {...assignment}
            if (currAssignment.task_id === task_id && currAssignment.assignee === currUser?.user_id){
                currAssignment.status = new_status
            }
            updatedTaskAssignments.push(currAssignment)
        })
        setLoadedTaskAssignments(updatedTaskAssignments)
        setTestTaskAssignments(updatedTaskAssignments)
    }

    const demoRetrieveTaskStatus = (task_id: number): string => {
        let status: string = "To-Do"
        loadedTaskAssignments.map(assignment => {
            if (assignment.task_id === task_id && assignment.assignee === currUser?.user_id){
                status = assignment.status
            }
        })
        return status
    }

    //test data for testing rendering, replace this with actual data later
    //note to self, user_id=1 is our current user 
    //NOTE: REPLACE THIS LATER!!111!!1!1!1
    const curr_user_id:number = 1

    /**
     * retrieve tasks based on accepted status, filters tasks to display to the user if it is assigned to them 
     * @param accepted boolean indicating whether to retrieve accepted or unaccepted tasks
     * @returns array of tasks that are either accepted or unaccepted (depending on the flag)
     */
    const tasks = (accepted: boolean)=>{
        const unacceptedTasks: Task[] = filteredTasksToView.filter(task => {
            let flag: boolean = false
            loadedTaskAssignments.map(assignment => {
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
            const clubName: string = loadedClubs.find(club => club.club_id === parseInt(id,10))?.name || ""
            return clubName
        }
        else {
            return "If you see this something went wrong"
        }
    }

    const goToTaskCreation = ()=>{
        navigate('/tasks/new_task/')
    }

    const goToTaskEdit = (id:number)=>{
        navigate(`/tasks/task_view/${id}/`)
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
                            <div className="sm:ml-auto w-fit flex">
                                <button className="task_accept_small sm:task_accept_button text-center flex items-center justify-center rounded-xl mt-1 mr-1" onClick={()=>demoAcceptTask(task.task_id)}>Accept</button>
                            
                                <img src={editIcon} className="task_view p-0.5 rounded text-center flex items-center justify-center rounded mt-1" onClick={()=>goToTaskEdit(task.task_id)}/>

                            </div>
                            
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

                                <div className="sm:ml-auto flex w-fit items-center">
                                    <select className="task_accept_select rounded-xl text-sm mr-1" onChange={(e)=>demoUpdateTaskStatus(task.task_id,e.target.value)} value={demoRetrieveTaskStatus(task.task_id)}>
                                    <option value="To-Do">To-Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    </select>

                                    <img src={editIcon} className="task_view p-0.5 rounded text-center flex items-center justify-center rounded" onClick={()=>goToTaskEdit(task.task_id)}/>
                                </div>
                                
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