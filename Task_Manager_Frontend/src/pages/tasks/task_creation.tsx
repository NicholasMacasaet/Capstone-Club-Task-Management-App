import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
// import { File } from "buffer"

export const TaskCreation = () => {
    const navigate = useNavigate()

    const onCancel = ()=>{
        navigate('/home')
    }

    const [taskName,setTaskName] = useState("")
    //note to self, assignee will be an array of strings later
    const [assignee,setAssignee] = useState("")

    //how do you track file attachments in react? TODO: look into this later
    const [attachments, setAttachments] = useState<File[] | null>(null)


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments(prev => prev ? [...prev, ...Array.from(e.target.files!)] : Array.from(e.target.files!)); // Track all selected files

            console.log("Selected files:", e.target.files);
        }
    };


    const handleTaskCreate = async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

    }


    return(<>
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex">
                <Link to="/home" className="text-3xl justify-self-start self-start sm:self-center">
                        <p>←</p>
                </Link>

                <h1 className="landing_page_header w-full hidden sm:block justify-self-center">
                    Create New Task
                </h1>
            </div>

            <p className="landing_page_header w-full text-4xl sm:hidden">
               Create New Task
            </p>

            <div className="task_creation_form_wrapper h-full sm:h-4/5 w-full sm:w-3/4 flex justify-start rounded-xl flex-col mt-5">
                <form className="w-full h-full flex flex-col justify-between" >
                    <div className="form_group flex flex-col sm:flex-row justify-center p-1 self-start">
                        <label className="sm:self-center self-start text-xl" htmlFor="task_name">Task Name:</label>
                        <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="task_name" name="task_name" required/>
                    </div>

                    <div className="form_group flex flex-col sm:flex-row justify-center p-1 self-start">
                        <label className="sm:self-center self-start text-xl" htmlFor="task_name">Assignees:</label>
                        {/* <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="assignees" name="assignees" required/> */}
                        <select className="form_input sm:ml-2 rounded-xl p-1" id="assignees" name="assignees">
                            <option defaultChecked disabled>None</option>
                            <option value="user1">user1</option>
                            <option value="user2">user2</option>
                            <option value="user3">user3</option>
                        </select>
                    </div>

                    <div className="form_group flex p-1 w-full flex-col sm:flex-row justify-center sm:justify-start self-start">
                        {/* <label className="sm:self-center self-start text-xl" htmlFor="task_name">Attachments:</label>
                        <input className="custom-file-upload sm:ml-2 rounded-xl p-1 flex flex-col" type="file" id="files" name="files" onChange={(e)=>handleFileChange(e)}/> */}

                        <label className="custom-file-upload text-xl flex self-start justify-start mr-1">
                            <input type="file" onChange={(e)=>handleFileChange(e)}/>
                            <p>Attachments 📎</p>
                        </label>

                        <div className="flex flex-col form_input rounded-xl p-1">
                                {attachments && attachments.length > 0 ? (
                                    <ul>
                                        {attachments.map((file, index) => (
                                            <li key={index} className="text-sm">{file.name}</li>
                                        ))}
                                    </ul>
                                ): (
                                    <p className="text-sm">No files selected</p>
                                )} 
                        </div>
                    </div>

                    <div className="form_group flex flex-col sm:flex-row justify-center p-1 self-start">
                        <label className="sm:self-center self-start text-xl" htmlFor="task_name">Associated Event:</label>
                        <select className="form_input sm:ml-2 rounded-xl p-1" id="associated_event" name="associated_event">
                            <option defaultChecked disabled>None</option>
                            <option value="event1">event1</option>
                            <option value="event2">event2</option>
                            <option value="event3">event3</option>
                        </select>
                    </div>


                    <div className="form_group flex flex-col justify-center p-1 self-start w-full">
                        <label className="self-start text-xl" htmlFor="task_name">Description:</label>
                        <textarea className="description w-full rounded-xl p-1" id="description" name="description"/>
                    </div>

                    


                    <div className="w-full flex justify-around">
                        <button className="bg-red-400 form_submit_normal self-center mt-auto mb-5" onClick={onCancel}>Cancel</button>
                        <button className="bg-green-400 form_submit_normal self-center mt-auto mb-5">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </>)

}