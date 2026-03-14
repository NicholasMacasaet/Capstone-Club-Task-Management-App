import { useNavigate } from "react-router-dom"
import { retrieveAndParseCurrClubID, retrieveAndParseCurrUser, retrieveAndParseTestClubMemberships, retrieveAndParseTestUsers } from "../../demo_utils/getters_and_setters"
import { useUserContext, type ClubMembership, type user } from "../../contexts/UserContext"
import { useEffect, useState } from "react"

export const InitiativeCreation = () => {

    const navigate = useNavigate()

    const [leadArr, setLeadArr] = useState<user[]>([])

    const [currUser, setCurrUser] = useState<user>()

    const [lead, setLead] = useState("None")

    const [description,setDescription] = useState("")

    const {isLoaded, testDataLoaded, currClubID, setCurrClubID}  = useUserContext()

    const [startDate, setStartDate] = useState("")

    const [endDate, setEndDate] = useState("")

    const [dateError,setDateError] = useState(false)

    const [initiativeType, setInitiativeType] = useState("General")

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

    const DEMOLoadFromCache = ()=>{


        const loaded_user_data: user[] = retrieveAndParseTestUsers()
        const loaded_club_membership_data: ClubMembership[] = retrieveAndParseTestClubMemberships()

        const loaded_curr_club_id: number | null = retrieveAndParseCurrClubID()

        const loaded_curr_user: user | null = retrieveAndParseCurrUser()
        


        if (loaded_user_data.length>0 && 
            loaded_club_membership_data.length > 0&& 
            loaded_curr_user !== null&& 
            loaded_curr_club_id !== null){
            
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

    //replace with a backend call later
    useEffect(() => {
        DEMOLoadFromCache()
    },[testDataLoaded])

    return(<>
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex sm:justify-center">

                <button className="text-3xl flex items-center side-item justify-center white_text new_back_button rounded-full !w-9 !h-9" onClick={()=>navigate(-1)}>
                    <p>&lt;</p>
                </button>


                <h1 className="landing_page_header w-full hidden sm:block white_text">
                    Create New Initiative
                </h1>
            </div>

            <p className="landing_page_header w-full text-4xl sm:hidden white_text">
               Create New Initiative
            </p>

            <div className="initiative_creation_form_wrapper h-full sm:h-4/5 w-full sm:w-3/4 flex justify-start rounded-xl flex-col mt-5">
                <form className="w-full h-full flex flex-col justify-start items-center">
                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 w-7/8 self-start sm:self-center">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="task_name">Initiative Name:</label>
                        <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="task_name" name="task_name" required />
                    </div>


                    <div className="form_group flex flex-col sm:flex-row justify-start p-1 self-start sm:self-center mt-4 w-7/8">
                        <label className="sm:self-center self-start text-xl font-bold" htmlFor="task_name">Initiative Lead:</label>
                        {/* <input className="form_input sm:ml-2 rounded-xl p-1" type="text" id="assignees" name="assignees" required/> */}
                        <select className="form_input sm:ml-2 rounded-xl p-1" id="assignees" name="assignees" value={lead} onChange={(e)=>setLead(e.target.value)}>
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


                    <div className="form_group flex flex-col justify-center p-1 self-start sm:self-center w-7/8 mt-4">
                        <label className="self-start text-xl font-bold" htmlFor="task_name">Description:</label>
                        <textarea className="description w-full rounded-xl p-1" id="description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
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