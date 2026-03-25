import {useParams } from "react-router-dom"
import type { Club, Task, TaskAssignment, user } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUserContext } from "../../contexts/UserContext"
import { retrieveAssigners } from "../../misc_utils/retrieve_assigner"
import { FooterNav } from "../../components/footer_nav"
import editIcon from "../../assets/edit-button-svgrepo-com.svg" 
import { retrieveAndParseCurrUser, retrieveAndParseTestClubs, retrieveAndParseTestTaskAssignments, retrieveAndParseTestTasks, setCurrUserLocalStorage, setTestTaskAssignments } from "../../demo_utils/getters_and_setters"
import { testUsers } from "../../assets/test_data"
import { chronoSortTasks } from "../../misc_utils/chrono_sort_tasks"
import hamburgerMenuIcon from "../../assets/hamburger-menu-svgrepo-com.svg"
import exclamationIcon from "../../assets/exclamation-mark-circle-f-svgrepo-com.svg"
import mailOpen from "../../assets/mail-open-file-svgrepo-com.svg"
import checkFilled from "../../assets/circle-check-filled-svgrepo-com.svg"
import loading from "../../assets/loading-2-svgrepo-com.svg"

export const TaskDashboard = () => {

    const navigate = useNavigate()

    const {id} = useParams()

    const {isLoaded, testDataLoaded} = useUserContext()

    const [currUser, setCurrUser] = useState<user>()
    
    const [loadedTasks, setLoadedTasks] = useState<Task[]>([])

    const [filteredTasksToView, setFilteredTasksToView] = useState<Task[]>([])

    const [needsAttentionTasks, setNeedsAttentionTasks] = useState<Task[]>([])

    const [completedTasks, setCompletedTasks] = useState<Task[]>([])

    //demo code 
    const [loadedTaskAssignments, setLoadedTaskAssignments] = useState<TaskAssignment[]>([])

    const [loadedClubs, setLoadedClubs] = useState<Club[]>([])
    //end demo setters

    //useffect for retreiving tasks based on the club id in the url params and filtering them based on whether they are assigned to the current user and their accepted status, also filter tasks that need attention based on due date and put those in a separate list for easier rendering in the frontend, also sort the tasks by due date with the most urgent ones first for better organization in the frontend
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

            let completedTasksList: Task[] = []
            loadedTasks.map(task => {
                if (id && (task.club_id === parseInt(id,10))){
                    //check status, if its completed add to completed list, if not add to filtered tasks list 
                    loadedTaskAssignments.map(assignment => {
                        if (assignment.task_id === task.task_id && assignment.assignee === currUser?.user_id){
                            if (assignment.status === "Completed"){
                                completedTasks.push(task)
                            }
                            else{
                                filteredTasksList.push(task)
                            }
                        }
                    })
                }
            })
            
            setCompletedTasks(completedTasksList)
            console.log("completed tasks: ", JSON.stringify(completedTasks, null, 2))

            filteredTasksList = chronoSortTasks(filteredTasksList)
            //filter tasks due within 3 days and not completed, add those to a separate list for tasks that need attention
            let needsAttentionList: Task[] = []
            
            filteredTasksList.map(task => {
                if (timeCheck(task.due_date)){
                    needsAttentionList.push(task)
                }
            })

            console.log("Tasks that need attention: ", JSON.stringify(needsAttentionList, null, 2))

            setNeedsAttentionTasks(needsAttentionList)
            setFilteredTasksToView(filteredTasksList)
        }
    },[isLoaded, id, loadedTasks, currUser])

    /**
     *check to see if the due date is within 3 days OR in the past, if so return true to indicate it needs attention, otherwise return false
     * @param due_date The due date of the task to check, passed as a string in the format "YYYY-MM-DD"
     * @returns A boolean indicating whether the task needs attention based on the due date (true if the due date is within 3 days or in the past, false otherwise)
     */
    const timeCheck = (due_date: string): boolean => {
        const today = new Date()
        const dueDate = new Date(due_date)
        const timeDiff = dueDate.getTime() - today.getTime()
        const dayDiff = timeDiff / (1000 * 3600 * 24)

        return dayDiff <= 3 && dayDiff >= 0 || dueDate < today
    }

    /**
     * A function for simulating calling/retrieving information from the database by retrieving the test data I've made from localStorage
     */
    const DEMOloadFromCache = () => {

        const task_data: Task[] = retrieveAndParseTestTasks()
        const club_data: Club[] = retrieveAndParseTestClubs()
        const task_assignment_data: TaskAssignment[] = retrieveAndParseTestTaskAssignments()
        const curr_user: user | null = retrieveAndParseCurrUser()

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
        DEMOloadFromCache()

    }, [testDataLoaded])

    const DEMOAcceptTask = (task_id: number) => {
        //replace with actual api call to update the task assignment to accepted in the database

        console.log("previous task assignments: ", JSON.stringify(loadedTaskAssignments, null, 2))
        let updatedTaskAssignments: TaskAssignment[] = []
         loadedTaskAssignments.map(assignment => {
            const currAssignment:TaskAssignment = {...assignment}
            if (currAssignment.task_id === task_id && currAssignment.assignee === currUser?.user_id){
                currAssignment.accepted = true
                currAssignment.status = "To-Do"
            }
            updatedTaskAssignments.push(currAssignment)
        })
        setLoadedTaskAssignments(updatedTaskAssignments)
        setTestTaskAssignments(updatedTaskAssignments)
    }

    const DEMOUpdateTaskStatus = (task_id: number, new_status: string) => {
        //replace with actual api call to update the task assignment status in the database

        //make a copy of the current task assignments, completed tasks, filtered tasks, and needs attention tasks to update based on the new status and then set the state with the updated lists after the map function
        //important to move around the task between the different lists based on the new status (ex: if the new status is completed, remove it from the filtered tasks list and add it to the completed tasks list, if the new status is in progress, remove it from the needs attention list if its there, etc)
        let updatedTaskAssignments: TaskAssignment[] = []
        let updatedCompletedTasks: Task[] = [...completedTasks]
        let updatedFilteredTasks: Task[] = [...filteredTasksToView]
        let updatedNeedsAttentionTasks: Task[] = [...needsAttentionTasks]

        loadedTaskAssignments.map(assignment => {
            const currAssignment: TaskAssignment = {...assignment}
            if (currAssignment.task_id === task_id && currAssignment.assignee === currUser?.user_id){

                currAssignment.status = new_status
                //need specific index so I can use splice to easily remove it from the lists if its status changed to completed or from completed if its status changed from completed to something else
                const foundTask: Task | undefined = loadedTasks.find(task => task.task_id === task_id)
               
                //if the task was found, check the new status and move the task between the lists accordingly
                if (foundTask){
                    if (new_status === "Completed"){
                            //add the task to the completed tasks list
                            updatedCompletedTasks.push(foundTask)
                            //also remove it from the filtered tasks list
                            updatedFilteredTasks = updatedFilteredTasks.filter(task => task.task_id !== task_id)
                            //and finally remove it from the needs attention list if its there
                            updatedNeedsAttentionTasks = updatedNeedsAttentionTasks.filter(task => task.task_id !== task_id)
                    }
                    
                    else {
                        //if the new status is not completed and the assignment's status is completed, that means the task was moved out of completed, so we need to remove it from the completed list and add it back to the filtered tasks list 
                        if (assignment.status === "Completed"){
                            //remove task from completed list
                            updatedCompletedTasks = updatedCompletedTasks.filter(task => task.task_id !== task_id)

                            //add it back to the user's general tasks list
                            updatedFilteredTasks.push(foundTask)

                            //check if the task needs attention based on the due date, if so add it to the needs attention list as well
                            if (timeCheck(foundTask.due_date)){
                                updatedNeedsAttentionTasks.push(foundTask)
                            }

                        }
                        //no else case because in any other case we're just changing its status but it would still be in the same lists
                    }
                }
            }
            updatedTaskAssignments.push(currAssignment)
        })

        // console.log("updated task assignments: ", JSON.stringify(updatedCompletedTasks, null, 2))
        setFilteredTasksToView(updatedFilteredTasks)
        setCompletedTasks(updatedCompletedTasks)
        setNeedsAttentionTasks(updatedNeedsAttentionTasks)
        setLoadedTaskAssignments(updatedTaskAssignments)
        setTestTaskAssignments(updatedTaskAssignments)
    }

    const DEMORetrieveTaskStatus = (task_id: number): string => {
        let status: string = "To-Do"
        loadedTaskAssignments.map(assignment => {
            if (assignment.task_id === task_id && assignment.assignee === currUser?.user_id){
                status = assignment.status
            }
        })
        return status
    }


    const DEMOSwitchTestUsers = () => {
        //replace with actual functionality to switch the logged in user in your application
        let new_user: user|undefined = undefined

        if (currUser?.user_id === 1){
            new_user= testUsers[1]
        }
        else if (currUser?.user_id === 2){
            new_user = testUsers[0]
        }
        
        if (new_user){
            setCurrUser(new_user)
            setCurrUserLocalStorage(new_user)
        }
    }

    //test data for testing rendering, replace this with actual data later
    //note to self, user_id=1 is our current user 
    //NOTE: REPLACE THIS LATER!!111!!1!1!1

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
                    if (assignment.assignee === currUser?.user_id){
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


    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);  // 768px is Tailwind's 'sm' breakpoint; adjust if needed
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        setExpandAttentionSection(!isMobile);
        setExpandAcceptSection(!isMobile);
        setExpandCurrentSection(!isMobile);
        setExpandCompletedSection(!isMobile);
    }, [isMobile]);


    const [expandAttentionSection, setExpandAttentionSection] = useState<boolean>(!isMobile)

    // const attentionTasksToShow = expandAttentionSection
    // ? needsAttentionTasks
    // : needsAttentionTasks.slice(0, 1);

    const attentionTasksToShow = isMobile
    ? (expandAttentionSection ? needsAttentionTasks : needsAttentionTasks.slice(0, 1))
    : needsAttentionTasks;  // always show all on desktop

    const [expandAcceptSection, setExpandAcceptSection] = useState<boolean>(!isMobile)

    // const acceptTasksToShow = expandAcceptSection
    // ? tasks(false)
    // : tasks(false).slice(0, 1);

    const acceptTasksToShow = isMobile
    ? (expandAcceptSection ? tasks(false) : tasks(false).slice(0, 1))
    : tasks(false);
    
    const [expandCurrentSection, setExpandCurrentSection] = useState<boolean>(!isMobile)

    // const currentTasksToShow = expandCurrentSection
    // ? tasks(true)
    // : tasks(true).slice(0, 1);

    const currentTasksToShow = isMobile
    ? (expandCurrentSection ? tasks(true) : tasks(true).slice(0, 1))
    : tasks(true);

    const [expandCompletedSection, setExpandCompletedSection] = useState<boolean>(!isMobile)

    // const completedTasksToShow = expandCompletedSection 
    // ? completedTasks
    // : completedTasks.slice(0, 1)

    const completedTasksToShow = isMobile
    ? (expandCompletedSection ? completedTasks : completedTasks.slice(0, 1))
    : completedTasks;
    
    const taskContainerHeaderCSSStyling: string = "w-7/8 mt-5 flex self-center font-bold opacity-50"

    const taskContainerBodyCSSStyling: string = "w-7/8 h-fit flex flex-col self-center mt-2 mb-2 drop-shadow-lg"

    // State for hamburger menu dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown when clicking outside (optional enhancement)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('.hamburger-menu-container')) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);
    
    return(<>

        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex">
                <div className="hamburger-menu-container relative flex flex-col">
                    <button 
                        onClick={toggleDropdown}
                        className="flex items-center justify-center p-2 hover:bg-gray-700 rounded-md transition-colors"
                    >
                        <img src={hamburgerMenuIcon} alt="Hamburger Menu" className="w-8 h-8 hamburger_menu_icon" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                            <div className="py-1">
                                <button 
                                    onClick={() => {
                                        navigate("/profile");
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    👤 Profile
                                </button>
                                {id && (
                                    <button 
                                        onClick={() => {
                                            navigate(`/club/home/${id}`);
                                            setIsDropdownOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        🏢 Tasks
                                    </button>
                                )}
                                <button 
                                    onClick={() => {
                                        navigate(`/initiatives/dashboard/${id}`);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    🎯 Initiatives
                                </button>
                                <div className="border-t border-gray-200 my-1"></div>
                                <button 
                                    onClick={() => {
                                        // Add logout logic here
                                        navigate("/");
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                

                <p className="landing_page_header w-full justify-self-center flex items-center justify-center white_text !font-bold self-start">
                    {currUser?.username}
                </p>

                {/* <p className="landing_page_header w-full block sm:hidden justify-self-center text-2xl flex items-center justify-center white_text !font-bold self-start">
                    {currUser?.username}
                </p> */}

                <div className="h-1/3 flex flex-col switch_container side-item">
                    <p className="text-xs text-center white_text">
                        Switch user
                    </p>
                    <label className="switch self-center">
                        <input type="checkbox" onChange={DEMOSwitchTestUsers}>
                        </input>
                        <span className="slider round">
                        </span>
                    </label>
                </div>
            </div>

            <div className="w-full flex justify-start">
                <button className="text-3xl flex items-center side-item justify-center white_text new_back_button rounded-full !w-9 !h-9" onClick={()=>navigate("/orgs/landing")}>
                <p>&lt;</p>
                </button>
            </div>

            {/* <p className="landing_page_header w-full text-3xl sm:hidden">
               Streamline
            </p> */}

            <p className="text-lg sm:text-2xl welcome_user self-start mt-2 white_text hidden sm:block font-bold">Welcome {currUser?.username || "User"}</p>

            <p className="text-lg sm:text-2xl self-start mt-2 white_text block sm:hidden bold font-bold">Welcome {currUser?.username || "User"}</p>

            <p className="white_text self-start left_offset hidden sm:block opacity-50 font-bold">You have {filteredTasksToView.length} pending tasks for today</p>

            <p className="white_text self-start block sm:hidden opacity-50 font-bold">You have {filteredTasksToView.length} pending tasks for today</p>


            <div className="dashboard_wrapper h-full sm:h-7/8 w-full sm:w-3/4 flex justify-start rounded-4xl flex-col mt-4 overflow-y-scroll">
                <p className="text-lg sm:text-2xl">My Tasks for {retrieveClubInfo()}</p>

                <div className="block-row w-full h-fit flex flex-row mt-4 justify-center">
                    <div className="landing_block rounded-xl flex flex-col needs_attention mr-5">
                        <p className="landing_block_text">{needsAttentionTasks.length}</p>
                        <p className="landing_block_text">Needs Attention</p>
                        
                    </div>

                    <div className="landing_block rounded-xl flex flex-col to_be_accepted">
                        <p className="landing_block_text">{tasks(false).length}</p>
                        <p className="landing_block_text">To Be Accepted</p>
                    </div>

                    <div className="landing_block rounded-xl flex flex-col task_create_button_updated text-white ml-5" onClick={goToTaskCreation}>
                        <p className="landing_block_text">+</p>
                        <p className="landing_block_text">Task</p>
                    </div>
                </div>


                <div className="w-full h-fit flex flex-col sm:flex-row">
                    <div className="h-fit w-full sm:w-1/2 flex flex-col items-center">
                        <div className={`${taskContainerHeaderCSSStyling}`}>
                            <p>Needs Attention</p>
                        </div>
                        <div className={`needs_attention_container ${taskContainerBodyCSSStyling}`}> 
        
                            <div className="text-xl self-start mt-1 w-full flex section_header" onClick={()=>setExpandAttentionSection(prev=>!prev)}> 
                                <div className="flex items-center">
                                    <img src={exclamationIcon} alt="Exclamation Icon" className="w-4.5 h-4.5 ml-3" />
                                    <p className="ml-3 section_title">Urgent Action Required</p>
                                </div>
                                {isMobile&&
                                <svg
                                    className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-300 ${
                                        expandAttentionSection ? 'rotate-180' : ''
                                    }`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M19 9l-7 7-7-7" />
                                </svg>}
                            </div>

                            <div className={"w-full h-full flex flex-col items-center section_body" + (needsAttentionTasks.length === 0 ? " round_bottom_on_empty":"")}>
                                {attentionTasksToShow.map((task,index)=>(
                                    <div className="task_item_container h-fit flex flex-col mb-2"> 
                                        <div className={`unaccepted_task_item w-full h-fit flex flex-col sm:flex-row justify-between sm:justify-start items-center`}>
                                            <div className="flex flex-row sm:flex-col items-center sm:items-start w-full sm:w-fit justify-between sm:justify-start">
                                                <p className="text-sm sm:text-lg font-bold">{task.task_name}</p>
                                                <p className="text-xs sm:text-sm">By: {task.due_date}</p>
                                            </div>
                                            {/* <p className="ml-3 text-xs sm:text-sm w-full sm:w-1/3 text-left">Assigned by {retrieveAssigners(task.task_id)}</p> */}

                                            <div className="ml-auto flex w-fit items-center">
                                                {/* <select className="task_accept_select rounded-xl text-sm mr-1" onChange={(e)=>DEMOUpdateTaskStatus(task.task_id,e.target.value)} value={DEMORetrieveTaskStatus(task.task_id)}>
                                                <option value="To-Do">To-Do</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                                </select> */}

                                                <img src={editIcon} className="task_view p-0.5 rounded text-center flex items-center justify-center rounded" onClick={()=>goToTaskEdit(task.task_id)}/>
                                            </div>
                                            
                                        </div>
                                    

                                        <div className={`divider_bar w-full self-center ${(index !== attentionTasksToShow.length - 1 || attentionTasksToShow.length === 0) ? 'task_item_border_bottom' : 'hidden'}`}></div> 
                                        
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="h-fit w-full sm:w-1/2 flex flex-col items-center">
                        <div className={`${taskContainerHeaderCSSStyling}`}>
                            <p>To be Accepted</p>
                        </div>
                        <div className={`accept_container ${taskContainerBodyCSSStyling}`}>
                            <div className="text-xl self-start mt-1 w-full flex section_header" onClick={()=>setExpandAcceptSection(prev=>!prev)}> 

                                <div className="flex items-center">
                                    <img src={mailOpen} alt="Mail Open Icon" className="w-4.5 h-4.5 ml-3" />
                                    <p className="ml-3 section_title">New Assignments</p>
                                </div>
                                {isMobile&&
                                <svg
                                    className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-300 ${
                                        expandAcceptSection ? 'rotate-180' : ''
                                    }`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M19 9l-7 7-7-7" />
                                </svg>

                                }
                            </div>

                            <div className={"w-full h-fit flex flex-col items-center section_body" + (tasks(false).length === 0 ? " round_bottom_on_empty":"")}>
                                {acceptTasksToShow.map((task,index)=>(
                                    <div className="task_item_container h-fit flex flex-col mb-2"> 
                                        <div className={`unaccepted_task_item w-full h-fit flex flex-row items-center justify-between`}>
                                            <div className="flex flex-col w-fit">
                                                <p className=" text-sm sm:text-lg w-full text-left font-bold">{task.task_name}</p>
                                                <p className=" text-xs sm:text-sm w-full text-left">Assigned by {retrieveAssigners(task.task_id)}</p>
                                            </div>

                                            <div className="sm:ml-auto w-fit flex">

                                                <button className="task_accept_small sm:task_accept_button text-center flex items-center justify-center rounded-xl mt-1 mr-1 text-red-500" onClick={()=>DEMOAcceptTask(task.task_id)}>x</button>

                                                <button className="task_accept_small sm:task_accept_button text-center flex items-center justify-center rounded-xl mt-1 mr-1 text-emerald-500" onClick={()=>DEMOAcceptTask(task.task_id)}>✓</button>

                                                
                                            
                                                <img src={editIcon} className="task_view p-0.5 rounded text-center flex items-center justify-center rounded mt-1" onClick={()=>goToTaskEdit(task.task_id)}/>

                                            </div>
                                            
                                        </div>

                                        <div className={`divider_bar w-full self-center ${(index !== acceptTasksToShow.length - 1 || acceptTasksToShow.length === 0) ? 'task_item_border_bottom' : 'hidden'}`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                

                
                <div className="w-full h-fit flex flex-col sm:flex-row">
                    <div className="h-fit w-full sm:w-1/2 flex flex-col items-center">
                        <div className={`${taskContainerHeaderCSSStyling}`}>
                            <p>Current Tasks</p>
                        </div>
                        <div className={`current_tasks_container ${taskContainerBodyCSSStyling}`}>
                            <div className="text-xl self-start mt-1 w-full flex section_header" onClick={()=>setExpandCurrentSection(prev=>!prev)}> 
                                <div className="flex items-center">
                                    <img src={loading} alt="Mail Open Icon" className="w-4.5 h-4.5 ml-3" />
                                    <p className="ml-3 section_title">In Progress</p>
                                </div>
                                {isMobile &&
                                    <svg
                                    className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-300 ${
                                        expandCurrentSection ? 'rotate-180' : ''
                                    }`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                                }
                                
                            </div>

                            <div className={"w-full h-fit flex flex-col items-center section_body" + (tasks(true).length === 0 ? " round_bottom_on_empty":"")}>
                                {currentTasksToShow.map((task,index)=>(

                                    <div className="task_item_container h-fit flex flex-col mb-2"> 

                                        <div className={`unaccepted_task_item w-full h-fit  flex flex-col sm:flex-row justify-between sm:justify-start items-center`}>
                                            <div className="flex flex-row sm:flex-col items-center sm:items-start w-full sm:w-fit justify-between sm:justify-start">
                                                <p className="text-sm sm:text-lg font-bold">{task.task_name}</p>
                                                <p className="text-xs sm:text-sm">By: {task.due_date}</p>
                                            </div>
                                            {/* <p className="ml-3 text-xs sm:text-sm w-full sm:w-1/3 text-left">Assigned by {retrieveAssigners(task.task_id)}</p> */}

                                            <div className="ml-auto flex w-fit items-center">
                                                <select className="task_accept_select rounded-xl text-sm mr-1" onChange={(e)=>DEMOUpdateTaskStatus(task.task_id,e.target.value)} value={DEMORetrieveTaskStatus(task.task_id)}>
                                                <option value="To-Do">To-Do</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                                </select>

                                                <img src={editIcon} className="task_view p-0.5 rounded text-center flex items-center justify-center rounded" onClick={()=>goToTaskEdit(task.task_id)}/>
                                            </div>

                                            {/* <div className={`divider_bar w-7/8 ${(index !== currentTasksToShow.length - 1 || currentTasksToShow.length === 0) ? 'task_item_border_bottom' : ''}`}></div> */}
                                            
                                        </div>


                                        <div className={`divider_bar w-full self-center ${(index !== currentTasksToShow.length - 1 || currentTasksToShow.length === 0) ? 'task_item_border_bottom' : 'hidden'}`}></div> 
                                        

                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="h-fit w-full sm:w-1/2 flex flex-col items-center">
                        <div className={`${taskContainerHeaderCSSStyling}`}>
                            <p>Completed</p>
                        </div>
                        <div className={`completed_tasks_container ${taskContainerBodyCSSStyling}`}>
                            <div className="text-xl self-start mt-1 w-full flex section_header" onClick={()=>setExpandCompletedSection(prev=>!prev)}> 
                                <div className="flex items-center">
                                    <img src={checkFilled} alt="Check Icon" className="w-4.5 h-4.5 ml-3" />
                                    <p className="ml-3 section_title">Completed Tasks</p>
                                </div>

                                {isMobile&&
                                <svg
                                    className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-300 ${
                                        expandCompletedSection ? 'rotate-180' : ''
                                    }`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M19 9l-7 7-7-7" />
                                </svg>

                                }
                            </div>

                            <div className={"w-full h-fit overflow-y-scroll flex flex-col items-center section_body" + (completedTasks.length === 0 ? " round_bottom_on_empty":"")}>
                                {completedTasksToShow.map((task, index)=>(

                                    <div className="task_item_container h-fit flex flex-col mb-2"> 

                                        <div className={`unaccepted_task_item w-full h-fit rounded-xl flex flex-col sm:flex-row justify-between sm:justify-start items-center`}>
                                            <div className="flex flex-row sm:flex-col items-center sm:items-start w-full sm:w-1/3 justify-between sm:justify-start">
                                                <p className="text-sm sm:text-lg font-bold line-through opacity-50">{task.task_name}</p>
                                                <p className="text-xs sm:text-sm text-emerald-500">Done</p>
                                            </div>
                                            {/* <p className="ml-3 text-xs sm:text-sm w-full sm:w-1/3 text-left">Assigned by {retrieveAssigners(task.task_id)}</p> */}

                                            <div className="sm:ml-auto flex w-fit items-center opacity-50">
                                                <select className="task_accept_select rounded-xl text-sm mr-1" onChange={(e)=>DEMOUpdateTaskStatus(task.task_id,e.target.value)} value={DEMORetrieveTaskStatus(task.task_id)}>
                                                <option value="To-Do">To-Do</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                                </select>

                                                <img src={editIcon} className="task_view p-0.5 rounded text-center flex items-center justify-center rounded" onClick={()=>goToTaskEdit(task.task_id)}/>
                                            </div>
                                            
                                        </div>


                                        <div className={`divider_bar w-full self-center ${(index !== completedTasksToShow.length - 1 || completedTasksToShow.length === 0) ? 'task_item_border_bottom' : 'hidden'}`}></div> 

                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterNav setting="Tasks"/>
        </div>
    </>)
}