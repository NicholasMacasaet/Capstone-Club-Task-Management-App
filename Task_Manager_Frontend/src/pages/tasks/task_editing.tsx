import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useUserContext, type Initiative, type Task } from "../../contexts/UserContext"
// import { testTasks, testTasks2 } from "../../assets/test_data"
import { retrieveAssigners } from "../../misc_utils/retrieve_assigner"
import { retrieveAndParseClubInitiatives, retrieveAndParseCurrClubID, retrieveAndParseTestTasks, setTestTasks } from "../../demo_utils/getters_and_setters"
// import { File } from "buffer"

export const TaskEditing = () => {
    //do multiple patch requests when specific information is updated 

    const navigate = useNavigate()

    const {id} = useParams()

    const {currUser, isLoaded}  = useUserContext()

    // const [currClubID, setCurrClubID] = useState(-1)

    const [loadedTasks, setLoadedTasks] = useState<Task[]>([])

    const [loadedInitiatives, setLoadedInitiatives] = useState<Initiative[]>([])

    const [currTask, setCurrTask] = useState<Task>()

    // const retrieveTaskInfo = async (id:string) => {
    //     try{
    //         //TODO: replace with an actual api call here 
    //         testTasks.concat(testTasks2).map(task=>{
    //             if (id && task.task_id === parseInt(id,10)){
    //                 setCurrTask(task)
    //             }
    //         })
    //     }catch{
    //         console.error("something went wrong")
    //     }
    // }

    const DEMORetrieveTaskInfo = (id:string) => {
        const tasks: Task[] = retrieveAndParseTestTasks()
        tasks.map(task=>{
            if (id && task.task_id === parseInt(id,10)){
                setCurrTask(task)
            }
        })
        setLoadedTasks(tasks)
    }

    const DEMORetrieveInitiatives = () =>{
        const loaded_curr_club_id: number | null = retrieveAndParseCurrClubID()
        const loaded_initiatives: Initiative[]|null = retrieveAndParseClubInitiatives()

        if (loaded_initiatives.length>0 && loaded_curr_club_id){
            let filteredInitiatives: Initiative[] = loaded_initiatives.filter(init=>{
                if (init.club_id === loaded_curr_club_id){
                    return true
                }
                else{
                    return false
                }
            })
            setLoadedInitiatives(filteredInitiatives)
            // setCurrClubID(loaded_curr_club_id)
        }
    }

    useEffect(()=>{
        if (!isLoaded){
            navigate("/")
        }

        if (id){
            DEMORetrieveTaskInfo(id)
            DEMORetrieveInitiatives()
        }
    },[isLoaded])


    useEffect(()=>{
        if (currTask) {
            let assigner_username:string = retrieveAssigners(currTask.task_id)
            if (assigner_username === currUser.username){
                assigner_username = "Self"
            }
            setTaskName(currTask.task_name)
            setAssigner(assigner_username)
            setTaskDate(currTask.due_date)
            setDescription(currTask.description)
            setSelectedInit(currTask.initiative_id.toString())
        }
    },[currTask])

    

    const [taskName,setTaskName] = useState("")
    //note to self, assignee will be an array of strings later
    const [assignee, setAssignee] = useState("None")

    const [assigner, setAssigner] = useState("")

    //how do you track file attachments in react? TODO: look into this later
    const [attachments, setAttachments] = useState<File[] | null>(null)

    const [taskDate, setTaskDate] = useState("")

    const [description,setDescription] = useState("")

    const [selectedInit, setSelectedInit] = useState("None")


    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setTaskName(e.target.value);
    }

    const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {  
        setAssignee(e.target.value);
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currTask){
            setCurrTask({...currTask, due_date: e.target.value})
        }
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

    const DEMOUpdateTask = () => {
        if (currTask){
            const updatedTask: Task = {
                ...currTask,
                task_name: taskName,
                due_date: taskDate,
                description: description,
                initiative_id: parseInt(selectedInit,10),
                attachments: attachments
            }
            setCurrTask(updatedTask)

            //update the loaded tasks array as well to reflect changes in the dashboard
            let updatedTasks = loadedTasks.map(task=>{
                if (task.task_id === currTask.task_id){
                    return updatedTask
                }
                return task
            })
            setLoadedTasks(updatedTasks)
            setTestTasks(updatedTasks)
        }
    }

    useEffect(()=>{
        DEMOUpdateTask()
    },[taskName, taskDate, description, attachments, selectedInit])

    return(<>
        {currTask !== undefined &&
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex">
                {/* <Link to="/home" className="text-3xl justify-self-start self-start sm:self-center">
                        <p>←</p>
                </Link> */}

                <button className="text-3xl flex items-center side-item justify-center white_text new_back_button rounded-full !w-9 !h-9" onClick={()=>navigate(-1)}>
                    <p>&lt;</p>
                </button>

                {/* <Link to="/orgs/landing" className="text-3xl flex items-center side-item justify-center white_text new_back_button rounded-full">
                        <p>&lt;</p>
                </Link> */}

                <h1 className="landing_page_header w-full hidden sm:block justify-self-center white_text ">
                    Viewing Task {currTask.task_name}
                </h1>
            </div>

            <p className="landing_page_header w-full text-4xl sm:hidden white_text ">
               Viewing Task {currTask.task_name}
            </p>

            <div className="task_creation_form_wrapper h-full sm:h-4/5 w-full sm:w-3/4 flex justify-start rounded-xl flex-col mt-5">
                <form className="w-full h-full flex flex-col justify-start items-center">
                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 w-7/8">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="task_name">Task Name:</label>
                        <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="task_name" name="task_name" required value={taskName} onChange={handleTaskNameChange}/>
                    </div>

                    
                    {assigner === "self" &&
                    <div className="form_group flex flex-col sm:flex-row justify-start p-1  mt-4 w-7/8">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="task_name">Assignee:</label>
                        {/* <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="assignees" name="assignees" required/> */}
                        <select className="form_input sm:ml-2 rounded-xl p-1" id="assignees" name="assignees" value={assignee} onChange={handleAssigneeChange}>
                            <option defaultChecked disabled>None</option>
                            <option value="user1">user1</option>
                            <option value="user2">user2</option>
                            <option value="user3">user3</option>
                        </select>
                    </div>

                    }

                    <div className="form_group flex flex-col sm:flex-row justify-start p-1  mt-4 w-7/8">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="task_name">Assigner:</label>
                        <p className="sm:self-center self-start text-xl">{assigner}</p>
                    </div>

                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 mt-4 w-7/8">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="date">Date:</label>
                        <input className="form_input sm:ml-2 rounded-xl p-1" type="date" id="task_name" name="task_name" required value={taskDate} onChange={handleDateChange}/>
                    </div>

                    <div className="form_group flex flex-col  justify-start p-1 mt-4 w-7/8">
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



                    <div className="form_group flex flex-col justify-center p-1  w-7/8 mt-4">
                        <label className="self-start text-xl font-bold" htmlFor="task_name">Initiative:</label>
                        <select className="form_input rounded-xl p-1 w-fit" id="associated_event" name="associated_event" value={selectedInit} onChange={(e)=>setSelectedInit(e.target.value)}>
                            <option defaultChecked>None</option>
                            {loadedInitiatives.map(init=>(
                                <option value={init.initiative_id}>
                                    {init.name}
                                </option>
                            ))
                            }
                        </select>
                    </div>

                    <div className="form_group flex flex-col justify-center p-1  w-7/8 mt-4">
                        <label className="self-start text-xl font-bold" htmlFor="task_name">Description:</label>
                        <textarea className="description w-full self-center rounded-xl p-1" id="description" name="description" value={description} onChange={handleDescriptionChange}/>
                    </div>

                </form>
            </div>
        </div>
        }
        {currTask === undefined &&
            <div>loading...</div>
        }
    </>)

}