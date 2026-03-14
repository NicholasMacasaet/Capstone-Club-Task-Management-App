import { useNavigate, useParams } from "react-router-dom"
import { useUserContext, type Initiative, type user } from "../../contexts/UserContext"
import { useEffect, useState } from "react"
import hamburgerMenuIcon from "../../assets/hamburger-menu-svgrepo-com.svg"
import { retrieveAndParseClubInitiatives, retrieveAndParseCurrUser, retrieveAndParseTestUsers, setClubInitiativesLocalStorage, setCurrUserLocalStorage } from "../../demo_utils/getters_and_setters"
import { testUsers } from "../../assets/test_data"
import { FooterNav } from "../../components/footer_nav"
import editIcon from "../../assets/edit-button-svgrepo-com.svg"

export const InitiativesDashboard = () => {

    const {id} = useParams()

    const navigate = useNavigate()

    const {isLoaded, testDataLoaded} = useUserContext()

    const [currUser, setCurrUser] = useState<user>()

    const [loadedUsers, setLoadedUsers] = useState<user[]>([])

    //all iniatives for the club, would be retrieved by api call to backend, but for now we'll just use the test data for initiatives that we have in our test data file and then filter it down to the initiatives for this specific club
    const [loadedInitiatives, setLoadedInitiatives] = useState<Initiative[]>([])

    //users specifically for this user's clubs
    const [filteredInitiatives, setFilteredInitiatives] = useState<Initiative[]>([])

    const [openInitiatives, setOpenInitiatives] = useState<Initiative[]>([])

    const [completedInitiatives, setCompletedInitiatives] = useState<Initiative[]>([])


    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);  // 768px is Tailwind's 'sm' breakpoint; adjust if needed
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const [expandOpenInitiatives, setExpandOpenInitiatives] = useState(!isMobile)

    const [expandCompletedInitiatives, setExpandCompletedInitiatives] = useState(!isMobile)

    useEffect(() => {
        setExpandOpenInitiatives(!isMobile);
        setExpandCompletedInitiatives(!isMobile);
    }, [isMobile]);

    const openInitiativesToShow = isMobile? (expandOpenInitiatives ? openInitiatives: openInitiatives.slice(0,1)):openInitiatives

    const completedInitiativesToShow = isMobile? (expandCompletedInitiatives ? completedInitiatives: completedInitiatives.slice(0,1)):completedInitiatives

    useEffect(()=>{
        if (!isLoaded){
            navigate(`/`)
        }
        else{
            DEMOloadFromCache()
        }
    },[isLoaded, id, testDataLoaded, currUser])

    // useEffect(()=>{
    //     DEMOloadFromCache()
    // },[testDataLoaded])

    const DEMOSwitchTestUsers = () => {
        //replace with actual functionality to switch the logged i user in your application
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

    /**
     * A function for simulating calling/retrieving information fro the database by retrieving the test data I've made fro localStorage
     */
    const DEMOloadFromCache = () => {
        const curr_user: user | null = retrieveAndParseCurrUser()
        if (curr_user !== null){
            setCurrUser(curr_user)
        }

        const club_initiatives = retrieveAndParseClubInitiatives()

        if(club_initiatives.length > 0){
            setLoadedInitiatives(club_initiatives)

            console.log("club initiatives retrieved from cache: ", JSON.stringify(club_initiatives,null,2))

            //filter by this user's club id, we're not filtering by initiatives the user owns since this is meant to show all initiatives for the club or org that the user is apart of 
            const filtered_initiatives = club_initiatives.filter(initiative => initiative.club_id === Number(id))

            setCompletedInitiatives(filtered_initiatives.filter(init => init.status === "Completed"))


            setOpenInitiatives(filtered_initiatives.filter(init => init.status !== "Completed"))


            console.log("filtered initiatives for this club: ", JSON.stringify(filtered_initiatives,null,2))
            setFilteredInitiatives(filtered_initiatives)
        }

        const test_users = retrieveAndParseTestUsers()
        if (test_users.length > 0){
            setLoadedUsers(test_users)
        }
    }

    const DEMOChangeInitStatus = (init_id:number, new_status: string) => {
        let updatedOpenInits: Initiative[] = [...openInitiatives]
        let updatedCompInits: Initiative[] = [...completedInitiatives]
        let updatedFilteredInits: Initiative[] = [...filteredInitiatives]
        let updatedLoadedInits: Initiative[] = [...loadedInitiatives]

        let foundInit: Initiative|undefined = filteredInitiatives.find(init => init.initiative_id === init_id)

        if (foundInit){
            if (new_status === "Completed"){
                foundInit.status = new_status
                //add to completed initiatives
                updatedCompInits.push(foundInit)
                //remove from the open initiatives
                updatedOpenInits = updatedOpenInits.filter(init => init.initiative_id !== foundInit.initiative_id)

            }
            else{
                //if the new status is not completed and the status of the initative is completed, then we're removing it from the completed list 
                if (foundInit.status ==="Completed"){
                    foundInit.status = new_status
                    updatedCompInits = updatedCompInits.filter(init => init.initiative_id!==init_id)

                    updatedOpenInits.push(foundInit)
                }
            }
            //just in case
            foundInit.status = new_status 
            //update status in filtered initiatives
            updatedFilteredInits.map(init=>{
                if (init.initiative_id === init_id){
                    init.status = new_status
                }
            })
            //update status in loaded initiatives
            updatedLoadedInits.map(init=>{
                if (init.initiative_id === init_id){
                    init.status = new_status
                }
            })

            //update local state variables
            setCompletedInitiatives(updatedCompInits)
            setOpenInitiatives(updatedOpenInits)
            setFilteredInitiatives(updatedFilteredInits)
            setLoadedInitiatives(updatedLoadedInits)

            //update local storage 
            setClubInitiativesLocalStorage(updatedLoadedInits)
        }
    }
        
    const DEMORetrieveUser = (user_id: number)=>{
        return loadedUsers.find(user => user.user_id === user_id)?.username
    }

    const DEMONavigateInitiativesCreation = ()=>{
        navigate("/initiatives/new_initiative/")
    }

    return(<>
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex">
                <div className="flex flex-col">
                    <img src={hamburgerMenuIcon} alt="Hamburger Menu" className="w-8 h-8 hamburger_menu_icon" />
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


            <p className="text-lg sm:text-2xl welcome_user self-start mt-2 white_text hidden sm:block font-bold">Welcome {currUser?.username || "User"}</p>

            <p className="text-lg sm:text-2xl self-start mt-2 white_text block sm:hidden bold font-bold">Welcome {currUser?.username || "User"}</p>


            <div className="alt_dashboard_wrapper_color h-full sm:h-7/8 w-full sm:w-3/4 flex justify-start rounded-4xl flex-col mt-4 overflow-y-scroll">

                <p className="text-lg sm:text-2xl mt-4">Initiatives for club</p>

                <div className="block-row w-full h-fit flex flex-row mt-4 justify-center">

                    {/*todo: filter by initiative status*/}
                    <div className="landing_block rounded-xl flex flex-col needs_attention mr-5">
                        <p className="landing_block_text">{openInitiatives.length}</p>
                        <p className="landing_block_text">Open Initiatives</p>
                        
                    </div>

                    <div className="landing_block rounded-xl flex flex-col to_be_accepted">
                        <p className="landing_block_text">{completedInitiatives.length}</p>
                        <p className="landing_block_text">Completed Initiatives</p>
                    </div>

                    <div className="landing_block rounded-xl flex flex-col task_create_button_updated text-white ml-5" onClick={DEMONavigateInitiativesCreation}>
                        <p className="landing_block_text">+</p>
                        <p className="landing_block_text">Initiative</p>
                    </div>
                </div>

                <div className="open_initiatives_container w-7/8 h-fit max-h-1/3 flex flex-col self-center drop-shadow-lg mt-4">

                    <div className="text-xl self-start mt-1 w-full flex section_header" onClick={()=>setExpandOpenInitiatives(prev=>!prev)}> 
                        <div className="flex items-center">
                            <p className="ml-3 section_title">Initiatives to do</p>
                        </div>
                        {isMobile&&
                        <svg
                            className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-300 ${
                                expandOpenInitiatives ? 'rotate-180' : ''
                            }`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 9l-7 7-7-7" />
                        </svg>}
                    </div>

                    <div className={`w-full h-full flex flex-col items-center section_body overflow-y-scroll`}>
                        {openInitiativesToShow.map((initiative,index)=>(
                            <div className="task_item_container h-fit flex flex-col mb-2">
                                <div className={`unaccepted_task_item w-full h-fit flex flex-row justify-between sm:justify-start items-center`}>
                                    <div className="flex flex-col items-start w-full sm:w-1/3 justify-between sm:justify-start">
                                        <p className="text-sm sm:text-lg font-bold">{initiative.name}</p>
                                        <p className="text-xs sm:text-sm">Lead: {DEMORetrieveUser(initiative.lead_id)}</p>
                                    </div>

                                    <div className="sm:ml-auto flex flex-col w-fit items-center self-end">

                                        <div className="w-fit flex">
                                            <select className="task_accept_select rounded-xl text-sm mr-1" value={initiative.status} onChange={(e)=>DEMOChangeInitStatus(initiative.initiative_id,e.target.value)}>
                                            <option value="To-Do">To-Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                            <img src={editIcon} className="task_view p-0.5 rounded text-center flex items-center justify-center rounded" />
                                        </div>
                                    
                                        <p className="text-xs sm:text-sm">Due: {initiative.due_date}</p>
                                    </div>
                                </div>

                                <div className={`divider_bar w-full self-center ${(index !== openInitiativesToShow.length - 1 || openInitiativesToShow.length === 0) ? 'task_item_border_bottom' : 'hidden'}`}></div> 
                            </div>
                        ))
                        }
                    </div>
                </div>

                
                <div className="closed_initiatives_container w-7/8 h-fit max-h-1/3 flex flex-col self-center drop-shadow-lg mt-4">
                    <div className="text-xl self-start mt-1 w-full flex section_header" onClick={()=>setExpandCompletedInitiatives(prev=>!prev)}> 
                        <div className="flex items-center">
                            <p className="ml-3 section_title">Completed Initiatives</p>
                        </div>
                        {isMobile&&
                        <svg
                            className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-300 ${
                                expandCompletedInitiatives ? 'rotate-180' : ''
                            }`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 9l-7 7-7-7" />
                        </svg>}
                    </div>
                    <div className={`w-full h-full flex flex-col items-center section_body overflow-y-scroll`}>
                            {completedInitiativesToShow.map((initiative,index)=>(
                            <div className="task_item_container h-fit flex flex-col mb-2">
                                <div className={`unaccepted_task_item w-full h-fit flex flex-row justify-between sm:justify-start items-center`}>
                                    <div className="flex flex-col items-start w-full sm:w-1/3 justify-between sm:justify-start">
                                        <p className="text-sm sm:text-lg font-bold opacity-50 line-through">{initiative.name}</p>
                                        <p className="text-xs sm:text-sm text-emerald-500">Done</p>

                                    </div>

                                    <div className="sm:ml-auto flex flex-col w-fit items-center self-end opacity-50">

                                        <div className="w-fit flex">
                                            <select className="task_accept_select rounded-xl text-sm mr-1" value={initiative.status} onChange={(e)=>DEMOChangeInitStatus(initiative.initiative_id,e.target.value)}>
                                           
                                            <option value="To-Do">To-Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                            <img src={editIcon} className="task_view p-0.5 rounded text-center flex items-center justify-center rounded" />
                                        </div>
                                    
                                        <p className="text-xs sm:text-sm">Due: {initiative.due_date}</p>
                                    </div>
                                </div>

                                <div className={`divider_bar w-full self-center ${(index !== completedInitiativesToShow.length - 1 || completedInitiativesToShow.length === 0) ? 'task_item_border_bottom' : 'hidden'}`}></div> 
                            </div>
                        ))
                        }
                        
                    </div>
                </div>
            </div>


            <FooterNav setting="Initiatives"/>
        </div>
    </>)
}