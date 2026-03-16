import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext, type ClubMembership, type Task, type TaskAssignment, type user } from "../../contexts/UserContext"
import { retrieveAndParseCurrClubID, retrieveAndParseCurrUser, retrieveAndParseTestClubMemberships, retrieveAndParseTestTaskAssignments, retrieveAndParseTestTasks, retrieveAndParseTestUsers, retrieveAndParseClubInitiatives} from "../../demo_utils/getters_and_setters"
// import { File } from "buffer"

export const TaskCreation = () => {
    const navigate = useNavigate()

    const [currUser, setCurrUser] = useState<user>()

    const [loadedTasks, setLoadedTasks] = useState<Task[]>([])

    const [loadedTaskAssignments, setLoadedTaskAssignments] = useState<TaskAssignment[]>([])

    const {isLoaded, testDataLoaded, currClubID, setCurrClubID}  = useUserContext()

    const [loadedInitiatives, setLoadedInitiatives] = useState<Initiative[]>([])

    useEffect(()=>{
        if (!isLoaded){
            navigate("/")
        }
    },[isLoaded])
 
    const DEMOloadFromCache = ()=>{
        const loaded_user_data: user[] = retrieveAndParseTestUsers()
        const loaded_club_membership_data: ClubMembership[] = retrieveAndParseTestClubMemberships()
        const loaded_tasks: Task[] = retrieveAndParseTestTasks()
        const loaded_task_assignments: TaskAssignment[] = retrieveAndParseTestTaskAssignments()
        const loaded_curr_club_id: number | null = retrieveAndParseCurrClubID()
        const loaded_curr_user: user | null = retrieveAndParseCurrUser()
        const loaded_initiatives: Initiative[]|null = retrieveAndParseClubInitiatives()

        if (loaded_user_data.length > 0 && 
            loaded_club_membership_data.length > 0 && 
            loaded_tasks.length > 0 && 
            loaded_task_assignments.length > 0 && 
            loaded_initiatives > 0 &&
            loaded_curr_club_id !== null && 
            loaded_curr_user !== null){


            let filtered_users = loaded_user_data.filter(user=>{
                if (user.user_id === loaded_curr_user.user_id){
                    return false
                }
                else{
                    const foundMembership: ClubMembership | undefined = loaded_club_membership_data.find(membership=> membership.user_id === user.user_id && membership.club_id === loaded_curr_club_id) 
                    if (foundMembership){
                        return true
                    }
                    else{
                        return false
                    }
                }
            })

            let filteredInitiatives: Initiative[] = []

            setAssigneeArray(filtered_users)
            //---do i need these double check later---
            setLoadedTasks(loaded_tasks)
            setLoadedTaskAssignments(loaded_task_assignments)
            //----------------------------------------
            setCurrUser(loaded_curr_user)
            setCurrClubID(loaded_curr_club_id)
        }
    }

    //replace with a backend call later
    useEffect(() => {
        DEMOloadFromCache()
    },[testDataLoaded])

    const onCancel = ()=>{
        navigate(`/club/home/${currClubID}/`)
    }

    const [taskName,setTaskName] = useState("")
    //note to self, assignee will be an array of strings later
    const [assignee,setAssignee] = useState("None")

    const [assigneeArray, setAssigneeArray] = useState<user[]>([])

    //how do you track file attachments in react? TODO: look into this later
    const [attachments, setAttachments] = useState<File[] | null>(null)

    // const [associatedEvent, setAssociatedEvent] = useState("None")

    const [date, setDate] = useState("")

    const [description,setDescription] = useState("")


    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setTaskName(e.target.value);
    }

    const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {  
        setAssignee(e.target.value);
    }

    // const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    //     setAssociatedEvent(e.target.value);
    // }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`Date: ${e.target.value}`)
        setDate(e.target.value)
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments(prev => prev ? [...prev, ...Array.from(e.target.files!)] : Array.from(e.target.files!)); // Track all selected files

            console.log("Selected files:", e.target.files);
        }
    }

    const removeFromFileArray = (index: number) => {
        if (attachments) {
            let newFiles = [...attachments];
            newFiles.splice(index, 1);
            setAttachments(newFiles);
        }
    }

    const packaged_data = {
        task_name: taskName,
        assignee: assignee,
        attachments: attachments,
        due_date: date,
        description: description,
    }

    const DEMOcreateTestTaskToCache = () => {

        const randomId = Math.floor(Math.random() * (100 - 6 + 1)) + 6;

        if (currUser && currClubID) {
            const testTask: Task = {
                task_id: randomId,
                club_id: currClubID,
                due_date: packaged_data.due_date,
                initiative_id: -1,
                task_name: packaged_data.task_name,
                attachments: packaged_data.attachments,
                description: packaged_data.description
            }

            const testTaskAssignment: TaskAssignment = {
                assigner: currUser.user_id ,
                assignee: parseInt(packaged_data.assignee,10),
                task_id: testTask.task_id,
                //auto accept task if its us
                status: currUser.user_id === parseInt(packaged_data.assignee,10)? "To-Do": "Needs Acceptance",
                accepted: currUser.user_id === parseInt(packaged_data.assignee,10)? true: false,
            }

            localStorage.setItem("total_test_tasks", JSON.stringify(loadedTasks.concat(testTask)))
            localStorage.setItem("test_task_assignments", JSON.stringify(loadedTaskAssignments.concat(testTaskAssignment)))
            console.log(`test task: ${JSON.stringify(testTask,null,2)}`)
            console.log(`test assignment: ${JSON.stringify(testTaskAssignment,null,2)}`)
        }

    }


    const handleTaskCreate = async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        console.log("Packaged data for task creation:", packaged_data)

        DEMOcreateTestTaskToCache()
        navigate(`/club/home/${currClubID}/`)
    }




    return(<>
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex sm:justify-center">
                {/* <Link to="/home" className="text-3xl justify-self-start self-start sm:self-center">
                        <p>←</p>
                </Link> */}

                {/* <button className="back_button text-3xl self-start sm:self-center sm:mr-auto" onClick={()=>navigate(-1)}>
                    ←
                </button> */}

                {/* <button className="text-3xl flex items-center side-item justify-center white_text new_back_button rounded-full" onClick={()=>navigate(-1)}>
                    <p>&lt;</p>
                </button> */}

                <button className="text-3xl flex items-center side-item justify-center white_text new_back_button rounded-full !w-9 !h-9" onClick={()=>navigate(-1)}>
                    <p>&lt;</p>
                </button>


                <h1 className="landing_page_header w-full hidden sm:block white_text">
                    Create New Task
                </h1>
            </div>

            <p className="landing_page_header w-full text-4xl sm:hidden white_text">
               Create New Task
            </p>

            <div className="task_creation_form_wrapper h-full sm:h-4/5 w-full sm:w-3/4 flex justify-start rounded-xl flex-col mt-5">
                <form className="w-full h-full flex flex-col justify-start items-center" onSubmit={(e)=>handleTaskCreate(e)}>
                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 w-7/8 self-start sm:self-center">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="task_name">Task Name:</label>
                        <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="task_name" name="task_name" required value={taskName} onChange={handleTaskNameChange}/>
                    </div>

                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 self-start sm:self-center mt-4 w-7/8">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="task_name">Assignee:</label>
                        {/* <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="assignees" name="assignees" required/> */}
                        <select className="form_input sm:ml-2 rounded-xl p-1" id="assignees" name="assignees" value={assignee} onChange={handleAssigneeChange}>
                            <option defaultChecked disabled>None</option>
                            <option value={currUser?.user_id}>myself</option>
                            {assigneeArray.length > 0 && 
                                assigneeArray.map(user =>(
                                    <option value={user.user_id}>
                                        {user.username}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 self-start sm:self-center mt-4 w-7/8">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="date">Date:</label>
                        <input className="form_input sm:ml-2 rounded-xl p-1" type="date" id="task_name" name="task_name" required value={date} onChange={(e)=>handleDateChange(e)}/>
                    </div>

                    <div className="form_group flex p-1 w-7/8 flex-col justify-center sm:justify-start self-start mt-4 self-start sm:self-center">
                        {/* <label className="sm:self-center self-start text-xl" htmlFor="task_name">Attachments:</label>
                        <input className="custom-file-upload sm:ml-2 rounded-xl p-1 flex flex-col" type="file" id="files" name="files" onChange={(e)=>handleFileChange(e)}/> */}

                        <label className="custom-file-upload text-xl flex self-start justify-start mr-1">
                            <input type="file" onChange={(e)=>handleFileChange(e)}/>
                            <p className="underline font-bold">Add Attachments 📎</p>
                        </label>

                        <div className="attachments_wrapper flex flex-col form_input rounded-xl p-1">
                                {attachments && attachments.length > 0 ? (
                                    <ul className="w-full">
                                        {attachments.map((file, index) => (
                                            <li key={index} className="text-sm flex items-center">{file.name}<button className="delete_button bg-red-400 self-start ml-2 mt-1 text-center flex items-center justify-center rounded-xl" onClick={() => removeFromFileArray(index)}>
                                            -
                                        </button></li>
                                        ))}
                                    </ul>
                                ): (
                                    <p className="text-sm">No files selected</p>
                                )} 
                        </div>
                    </div>

                    {/* <div className="form_group flex flex-col sm:flex-row justify-center p-1 self-start mt-4">
                        <label className="sm:self-center self-start text-xl" htmlFor="task_name">Associated Event:</label>
                        <select className="form_input sm:ml-2 rounded-xl p-1" id="associated_event" name="associated_event" value={associatedEvent} onChange={handleEventChange}>
                            <option defaultChecked disabled>None</option>
                            <option value="event1">event1</option>
                            <option value="event2">event2</option>
                            <option value="event3">event3</option>
                        </select>
                    </div> */}

                    <div className="form_group flex flex-col justify-center p-1 self-start sm:self-center w-7/8 mt-4">
                        <label className="self-start text-xl font-bold" htmlFor="task_name">Initiative:</label>
                        <select className="form_input sm:ml-2 rounded-xl p-1" id="associated_event" name="associated_event">
                            <option defaultChecked disabled>None</option>
                            <option value="event1">event1</option>
                            <option value="event2">event2</option>
                            <option value="event3">event3</option>
                        </select>
                    </div>


                    <div className="form_group flex flex-col justify-center p-1 self-start sm:self-center w-7/8 mt-4">
                        <label className="self-start text-xl font-bold" htmlFor="task_name">Description:</label>
                        <textarea className="description w-full rounded-xl p-1" id="description" name="description" value={description} onChange={handleDescriptionChange}/>
                    </div>

                    <div className="w-full flex justify-around">
                        <button className="bg-red-400 form_submit_normal self-center mt-auto mb-5" onClick={onCancel}>Cancel</button>
                        <button className="bg-green-400 form_submit_normal self-center mt-auto mb-5" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </>)

}