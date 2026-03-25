import { useNavigate, useParams } from "react-router-dom"
import { retrieveAndParseClubInitiatives, retrieveAndParseCurrClubID, retrieveAndParseCurrUser, retrieveAndParseTestClubMemberships, retrieveAndParseTestTaskAssignments, retrieveAndParseTestTasks, retrieveAndParseTestUsers, setClubInitiativesLocalStorage, setTestTaskAssignments, setTestTasks } from "../../demo_utils/getters_and_setters"
import { useUserContext, type ClubMembership, type Initiative, type Task, type TaskAssignment, type user } from "../../contexts/UserContext"
import { useEffect, useState } from "react"

export const InitiativesEditing = () => {
    const navigate = useNavigate()
    const { id } = useParams()  // Assuming route is /initiatives/initiative/:id/

    const { testDataLoaded}  = useUserContext()

    const [leadArr, setLeadArr] = useState<user[]>([])

    const [currUser, setCurrUser] = useState<user>()

    const [currClubID, setCurrClubID] = useState(-1)

    const [currentInitiative, setCurrentInitiative] = useState<Initiative | null>(null)

    const [DEMOLoadedInitiatives, setDEMOLoadedIntitiatives] = useState<Initiative[]>([])

    const [DEMOLoadedTaskAssignments, setDEMOLoadedTaskAssignments] = useState<TaskAssignment[]>([])

    const [DEMOLoadedTasks, setDEMOLoadedTasks] = useState<Task[]>([])

    const [initiativeName, setInitiativeName] = useState("")

    const [lead, setLead] = useState("None")

    const [description,setDescription] = useState("")

    const [attachments, setAttachments] = useState<File[] | null>(null)

    const [startDate, setStartDate] = useState("")

    const [endDate, setEndDate] = useState("")

    const [dateError,setDateError] = useState(false)

    const [initiativeType, setInitiativeType] = useState("General")

    //populate task assignments based on this 
    const [initiativeTasks, setIntitiativeTasks] = useState<Task[]>([])

    const [initiativeTaskAssignments, setInitiativeTaskAssignments ] = useState<TaskAssignment[]>([])
    /**
     * things that need to bet set for these tasks:
     * task_id
     * due_date
     * 
     * Also need to automatically populate assignment objects 
     */

    // const defaultOnboardingTasks: Task[]=[
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         club_id: currClubID,
    //         initiative_id: -1,
    //         task_name:"Hold Exec Elections",
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     },
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         initiative_id: -1,
    //         club_id: currClubID,
    //         task_name:"Debrief responsibilities to new Exec",
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     },
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         initiative_id: -1,
    //         club_id: currClubID,
    //         task_name:"Introduce to other Execs",
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     }
    // ]

    //  const defaultEventTasks: Task[]=[
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         club_id: currClubID,
    //         task_name:"Contact Event Space",
    //         initiative_id: -1,
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     },
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         club_id: currClubID,
    //         task_name:"Meet with food vendor",
    //         initiative_id: -1,
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     },
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         club_id: currClubID,
    //         task_name:"Send invites",
    //         initiative_id: -1,
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     },
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         club_id: currClubID,
    //         initiative_id: -1,
    //         task_name:"Confirm attendance and logistics",
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     }
    // ]

    // const defaultOffboardingTasks: Task[]=[
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         club_id: currClubID,
    //         initiative_id: -1,
    //         task_name:"Prepare successorship document",
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     },
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         club_id: currClubID,
    //         initiative_id: -1,
    //         task_name:"Advertise Exec opening",
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     },
    //     {
    //         task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
    //         club_id: currClubID,
    //         initiative_id: -1,
    //         task_name:"Prepare for student voting",
    //         due_date: "",
    //         attachments: null,
    //         description:""
    //     }
    // ]

    

    //double check date inputs 
    useEffect(() => {
        if (startDate !== "" && endDate !==""){
            const start = new Date(startDate)
            const end = new Date(endDate)
            setDateError(end < start)  // true if end is before start
        } else {
            setDateError(false)  // reset if dates are empty or valid
        }
    },[startDate,endDate])

     //replace with a backend call later
    useEffect(() => {
        DEMOLoadFromCache()
    },[testDataLoaded])

    // Before (buggy):
    // useEffect(() => {
    //     let updatedAssignments: TaskAssignment[] = [...initiativeTaskAssignments]
    //     updatedAssignments.map(init => {
    //         init.assigner = parseInt(lead, 10)
    //     })
    //     setInitiativeTaskAssignments(updatedAssignments)
    // }, [lead])

    // After (fixed):
    useEffect(() => {
        if (lead && initiativeTaskAssignments.length > 0) {
            let updatedAssignments: TaskAssignment[] = [...initiativeTaskAssignments]
            updatedAssignments.map(init => {
                init.assigner = parseInt(lead, 10)
            })
            setInitiativeTaskAssignments(updatedAssignments)
            
            console.log(`set lead: ${lead}`)
            console.log(`updated Initiative assignments: ${JSON.stringify(initiativeTaskAssignments,null,2)}`)
        }
    }, [lead])

    // useEffect(()=>{
    //     handleInitiativeTypeSelection(initiativeType)
    // },[initiativeType])


    const DEMOLoadFromCache = ()=>{


        const loaded_user_data: user[] = retrieveAndParseTestUsers()

        const loaded_club_membership_data: ClubMembership[] = retrieveAndParseTestClubMemberships()

        const loaded_curr_club_id: number | null = retrieveAndParseCurrClubID()

        const loaded_curr_user: user | null = retrieveAndParseCurrUser()

        const loaded_initiatives: Initiative[] | null = retrieveAndParseClubInitiatives()

        const loaded_assignments: TaskAssignment[] | null = retrieveAndParseTestTaskAssignments()

        const loaded_tasks: Task[] | null = retrieveAndParseTestTasks()
        

        if (loaded_user_data.length>0 && 
            loaded_club_membership_data.length > 0&& 
            loaded_initiatives && loaded_initiatives.length > 0 &&
            loaded_assignments && loaded_assignments.length>0 &&
            loaded_tasks && loaded_tasks.length > 0 &&
            loaded_curr_user !== null&& 
            loaded_curr_club_id !== null){

            setCurrClubID(loaded_curr_club_id)
            setCurrUser(loaded_curr_user)
            setDEMOLoadedIntitiatives(loaded_initiatives)
            setDEMOLoadedTaskAssignments(loaded_assignments)
            setDEMOLoadedTasks(loaded_tasks)
            
            // Find the current initiative by id
            const currentInit = loaded_initiatives.find(init => init.initiative_id === Number(id))
            if (currentInit) {
                setCurrentInitiative(currentInit)
                console.log(`curr init ${JSON.stringify(currentInit,null,2)}`)
                // Populate form fields
                setInitiativeName(currentInit.name)
                setLead(currentInit.lead_id.toString())
                setDescription(currentInit.description || "")
                setStartDate(currentInit.start_date)
                setEndDate(currentInit.due_date)
                setInitiativeType(currentInit.initiative_type)
                // Note: attachments would need special handling if stored as files

                // Filter tasks for this initiative
                const initTasks = loaded_tasks.filter(task => task.initiative_id === Number(id))
                // Set default due_date to initiative's due_date if task's due_date is empty
                const initTasksWithDefaults = initTasks.map(task => ({
                    ...task,
                    due_date: task.due_date || currentInit.due_date
                }))
                setIntitiativeTasks(initTasksWithDefaults)


                console.log(`TEST: Initiative tasks: ${JSON.stringify(initTasksWithDefaults,null,2)}`)
                

                // Filter assignments for these tasks
                let initAssignments = loaded_assignments.filter(assignment => 
                    initTasks.some(task => task.task_id === assignment.task_id)
                )

                setInitiativeTaskAssignments(initAssignments)

                console.log(`TEST Initiative assignments: ${JSON.stringify(initAssignments,null,2)}`)
                // // Ensure each task has an assignment
                // const assignmentsMap = new Map(initAssignments.map(a => [a.task_id, a]))
                // const completeAssignments = initTasksWithDefaults.map(task => {
                //     if (assignmentsMap.has(task.task_id)) {
                //         return assignmentsMap.get(task.task_id)!
                //     } else {
                //         // Create default assignment
                //         return {
                //             assigner: parseInt(currentInit.lead_id.toString(), 10),
                //             assignee: -1,
                //             task_id: task.task_id,
                //             status: "Needs Acceptance",
                //             accepted: false
                //         }
                //     }
                // })
                // setInitiativeTaskAssignments(completeAssignments)
            } else {
                // Initiative not found
                setInitiativeName("Initiative not found")
                setDescription("The requested initiative could not be found.")
            }
            
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
            setLeadArr(filtered_users)
        }
    }

    const onCancel = ()=>{
        navigate(`/initiatives/dashboard/${currClubID}/`)
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

    // const handleInitiativeTypeSelection = (initType:string)=>{
    //     // For editing, don't overwrite existing tasks
    //     if (initiativeTasks.length > 0) return;

    //     let updatedInitTasks: Task[] = []

    //     if (initType === "Onboarding"){
    //         updatedInitTasks = defaultOnboardingTasks
    //     }
    //     else if (initType === "Event") {
    //         updatedInitTasks = defaultEventTasks
    //     }

    //     else if (initType === "Offboarding") {
    //         updatedInitTasks = defaultOffboardingTasks
    //     }
    //     //its general
    //     else {
    //         updatedInitTasks = []
    //     }

    //     let autoPopulatedAssignments: TaskAssignment[] = []

    //     updatedInitTasks.map(task=>{
    //         const newAssignment:TaskAssignment= {
    //             assigner:parseInt(lead,10),
    //             assignee: -1,
    //             task_id: task.task_id,
    //             status: "Needs Acceptance",
    //             accepted: false
    //         }
    //         autoPopulatedAssignments.push(newAssignment)
    //     })
    //     setInitiativeTaskAssignments(autoPopulatedAssignments)
    //     setIntitiativeTasks(updatedInitTasks)
    // }

    /**
     * 
     * @param index index of the new task in initiatives tasks array to modify 
     * @param modified_field Should only be Name, Assignee, or Due Date
     * @param new_val the new value
     */
    const handleTaskAssignmentModification = (index:number, modified_field:string, new_val:string)=>{

        let updatedTasks:Task[] = [...initiativeTasks]
        let updatedAssignments: TaskAssignment[] = [...initiativeTaskAssignments]

        // Ensure assignment exists
        while (updatedAssignments.length <= index) {
            updatedAssignments.push({
                assigner: parseInt(lead, 10),
                assignee: -1,
                task_id: updatedTasks[index]?.task_id || Math.floor(Math.random() * 100),
                status: "Needs Acceptance",
                accepted: false
            })
        }

        updatedTasks.map((task,ind)=>{
            if (ind === index){
                if (modified_field === "Name"){
                    task.task_name = new_val
                }
                else if (modified_field === "Due Date"){
                    task.due_date = new_val
                }
            }
        })

        updatedAssignments.map((assgn,ind)=>{
            if (ind === index){
                if (modified_field === "Assignee"){
                    assgn.assignee = parseInt(new_val,10)
                }
            }
        })

        setIntitiativeTasks(updatedTasks)
        setInitiativeTaskAssignments(updatedAssignments)
    }

    const handleNewTask = ()=>{

        const newTask: Task = {
            task_id: Math.floor(Math.random() * (100 - 6 + 1)) + 6,
            club_id: currClubID,
            initiative_id: Number(id),
            task_name:"",
            due_date: "",
            attachments: null,
            description:""
        }

        const newAssignment:TaskAssignment= {
            assigner:parseInt(lead,10),
            assignee: -1,
            task_id: newTask.task_id,
            status: "Needs Acceptance",
            accepted: false
        }

        let updatedTasks:Task[] = [...initiativeTasks,newTask]
        let updatedAssignments: TaskAssignment[] = [...initiativeTaskAssignments,newAssignment]

        setInitiativeTaskAssignments(updatedAssignments)
        setIntitiativeTasks(updatedTasks)

    }

    // Check if all tasks have required fields
    const allTasksComplete = initiativeTasks.every((task, index) => {
        const assignment = initiativeTaskAssignments[index];
        return task.task_name.trim() !== "" && task.due_date !== "" && assignment?.assignee !== -1;
    });

    //  const displayAssignee = (index:number) => {
    //     const assignee_id: number |undefined = initiativeTaskAssignments[index].assignee
    //     if (assignee_id === -1){
    //         return "None"
    //     }
    //     else if (assignee_id === currUser?.user_id){
    //         return "Myself"
    //     }
    //     else{
    //         return leadArr.find(user=>user.user_id === assignee_id)?.username
    //     }
    // }
        
    const handleDeleteTask = (index: number) => {
        let updatedTasks = [...initiativeTasks];
        updatedTasks.splice(index, 1);

        let updatedAssignments = [...initiativeTaskAssignments];
        updatedAssignments.splice(index, 1);

        setIntitiativeTasks(updatedTasks);
        setInitiativeTaskAssignments(updatedAssignments);
    }

    

    // useEffect(()=>{
    //     console.log(`Initiative tasks: ${JSON.stringify(initiativeTasks,null,2)}`)
    //     console.log(`Initiative assignments: ${JSON.stringify(initiativeTaskAssignments,null,2)}`)

    // },[initiativeTasks,initiativeTaskAssignments])

    const DEMOInitiativeUpdate = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!currentInitiative) return;

        const updated_initiative: Initiative = {
            ...currentInitiative,
            lead_id: parseInt(lead,10),
            name: initiativeName,
            initiative_type: initiativeType,
            attachments:attachments,
            start_date: startDate,
            due_date: endDate,
            description: description,
        }

        // Update the initiative in the list
        let updatedInits: Initiative[] = DEMOLoadedInitiatives.map(init => 
            init.initiative_id === currentInitiative.initiative_id ? updated_initiative : init
        )

        console.log(`updated inits: ${JSON.stringify(updatedInits,null,2)}`)

        // Update tasks and assignments
        // Remove old tasks and assignments for this initiative
        let updatedTasks: Task[] = DEMOLoadedTasks.filter(task => task.initiative_id !== currentInitiative.initiative_id)
        let updatedAssignments: TaskAssignment[] = DEMOLoadedTaskAssignments.filter(assignment => 
            !initiativeTasks.some(task => task.task_id === assignment.task_id)
        )

        // Add updated tasks and assignments
        updatedTasks = updatedTasks.concat(initiativeTasks)
        updatedAssignments = updatedAssignments.concat(initiativeTaskAssignments)

        setTestTaskAssignments(updatedAssignments)
        setTestTasks(updatedTasks)
        setClubInitiativesLocalStorage(updatedInits)

        navigate(`/initiatives/dashboard/${currClubID}/`)
    }

    return(<>
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex sm:justify-center">

                <button className="text-3xl flex items-center side-item justify-center white_text new_back_button rounded-full !w-9 !h-9" onClick={()=>navigate(-1)}>
                    <p>&lt;</p>
                </button>


                <h1 className="landing_page_header w-full hidden sm:block white_text">
                    Edit Initiative
                </h1>
            </div>

            <p className="landing_page_header w-full text-4xl sm:hidden white_text">
               Edit Initiative
            </p>

            <div className="initiative_creation_form_wrapper h-full sm:h-4/5 w-full sm:w-3/4 flex justify-start rounded-xl flex-col mt-5 overflow-y-scroll">
                <form className="w-full h-full flex flex-col justify-start items-center" onSubmit={DEMOInitiativeUpdate}>
                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 w-7/8 self-start sm:self-center">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="task_name">Initiative Name:</label>
                        <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="task_name" name="task_name" required onChange={(e)=>setInitiativeName(e.target.value)} value={initiativeName}/>
                    </div>


                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 self-start sm:self-center mt-4 w-7/8">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="task_name">Initiative Lead:</label>
                        {/* <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="assignees" name="assignees" required/> */}
                        <select className="form_input sm:ml-2 rounded-xl p-1" id="assignees" name="assignees" value={lead} onChange={(e)=>setLead(e.target.value)} required>
                            <option defaultChecked disabled>None</option>
                            <option value={currUser?.user_id}>myself</option>
                            {leadArr.length > 0 && 
                                leadArr.map(user =>(
                                    <option value={user.user_id}>
                                        {user.username}
                                    </option>
                                ))
                            }
                        </select>
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

                    <div className="form_group flex flex-col justify-start p-1 self-start sm:self-center mt-4 w-7/8 items-start">
                        <label className="self-start text-xl font-bold" >Date Range:</label>
                        <div className="date_range_group w-fit flex">
                            <input className="form_input rounded-xl p-1 mr-1" type="date" required value={startDate} onChange={(e)=>setStartDate(e.target.value)}/> 
                            <p className="flex items-center">-</p>
                            <input className="form_input rounded-xl p-1 ml-1" type="date" required value={endDate} onChange={(e)=>setEndDate(e.target.value)}/> 
                        </div>
                        {dateError && <p className="text-red-500 mt-1">End date must be after start date.</p>}
                    </div>

                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 self-start sm:self-center mt-4 w-7/8">
                        <label className="sm:self-center self-start text-xl font-bold">Initiative:</label>
                        <select className="form_input sm:ml-2 rounded-xl p-1" id="assignees" name="assignees" value={initiativeType} onChange={(e)=>setInitiativeType(e.target.value)}>
                            <option value={"General"} defaultChecked>General</option>
                            <option value={"Onboarding"} >Onboarding</option>
                            <option value={"Offboarding"} >Offboarding</option>
                            <option value={"Event"}>Event</option>
                        </select>
                    </div>

                    {initiativeTasks.length >0 &&
                    <div className="form_group flex flex-col w-7/8 self-center init_task_window min-h-1/4 rounded-xl overflow-y-scroll items-center">
                        {
                        initiativeTasks.map((task,index)=>(
                                <div className="task_item_container h-fit flex flex-col mb-2"> 
                                    <div className={`unaccepted_task_item w-full h-fit flex flex-col sm:flex-row sm:items-center justify-between`}>
                                        <div className="flex flex-col w-fit sm:w-1/3 sm:mt-0">
                                            <input className="form_input sm:ml-2 rounded-xl p-1 text-sm" type="text" id="task_name" name="task_name" placeholder="task name" value={task.task_name} onChange={(e)=>handleTaskAssignmentModification(index,"Name",e.target.value)}/>
                                        </div>

                                         <select className="form_input sm:ml-2 rounded-xl p-1 w-fit mt-1 sm:mt-0 text-sm" value={initiativeTaskAssignments[index].assignee ?? -1} onChange={(e)=>handleTaskAssignmentModification(index, "Assignee", e.target.value)}>

                                            <option value="-1" disabled>None</option>
                                            <option value={currUser?.user_id}>myself</option>
                                            {leadArr.map(lead=>{
                                                return <option value={lead.user_id}>{lead.username}</option>
                                            })
                                            }
                                        </select>

                                        <input className="form_input rounded-xl p-1 mr-1 w-fit sm:w-1/3 mt-1 sm:mt-0 text-sm" type="date" required value={initiativeTasks[index].due_date} onChange={(e)=>handleTaskAssignmentModification(index,"Due Date",e.target.value)}/> 

                                        <button className="delete_button bg-red-400 self-start mt-1 text-center flex items-center justify-center rounded-xl" onClick={() => handleDeleteTask(index)}>
                                            -
                                        </button>
                                        
                                    </div>

                                    <div className={`divider_bar w-full self-center ${(index !== initiativeTasks.length - 1 || initiativeTasks.length === 0) ? 'task_item_border_bottom' : 'hidden'}`}></div>
                                </div>
                            ))}
                    </div>
                    }   

                    <div className="form_group flex flex-col sm:flex-row justify-start self-center w-7/8 mt-4">
                        <button className="bg-green-400 new_task_button text-white p-1" onClick={handleNewTask}>
                            New Task +
                        </button>
                        {!allTasksComplete && <p className="text-red-500 text-sm ml-4 self-center">All tasks must have an assignee, due date, and name</p>}
                    </div>

                    <div className="form_group flex flex-col justify-center p-1 self-start sm:self-center w-7/8 mt-4">
                        <label className="self-start text-xl font-bold" htmlFor="task_name">Description:</label>
                        <textarea className="description w-full rounded-xl p-1" id="description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div>


                    <div className="w-full flex justify-around">
                        <button className="bg-red-400 form_submit_normal self-center mt-auto mb-5" onClick={onCancel}>Cancel</button>
                        <button className="bg-green-400 form_submit_normal self-center mt-auto mb-5" type="submit">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}