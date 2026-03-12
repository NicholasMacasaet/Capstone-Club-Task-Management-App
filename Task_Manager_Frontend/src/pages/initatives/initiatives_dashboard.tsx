import { useNavigate, useParams } from "react-router-dom"
import { useUserContext, type Initiative, type user } from "../../contexts/UserContext"
import { useEffect, useState } from "react"
import hamburgerMenuIcon from "../../assets/hamburger-menu-svgrepo-com.svg"
import { retrieveAndParseClubInitiatives, retrieveAndParseCurrUser, setCurrUserLocalStorage } from "../../demo_utils/getters_and_setters"
import { testUsers } from "../../assets/test_data"
import { FooterNav } from "../../components/footer_nav"

export const InitiativesDashboard = () => {

    const {id} = useParams()

    const navigate = useNavigate()

    const {isLoaded, testDataLoaded} = useUserContext()

    const [currUser, setCurrUser] = useState<user>()

    //all iniatives for the club, would be retrieved by api call to backend, but for now we'll just use the test data for initiatives that we have in our test data file and then filter it down to the initiatives for this specific club
    const [loadedInitiatives, setLoadedInitiatives] = useState<Initiative[]>([])

    //users specifically for this user's clubs
    const [filteredInitiatives, setFilteredInitiatives] = useState<Initiative[]>([])
    useEffect(()=>{

    },[isLoaded, id])

    useEffect(()=>{
        DEMOloadFromCache()
    },[testDataLoaded])

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


            console.log("filtered initiatives for this club: ", JSON.stringify(filtered_initiatives,null,2))
            setFilteredInitiatives(filtered_initiatives)
        }
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
                        <p className="landing_block_text">999</p>
                        <p className="landing_block_text">Open Initiatives</p>
                        
                    </div>

                    <div className="landing_block rounded-xl flex flex-col to_be_accepted">
                        <p className="landing_block_text">999</p>
                        <p className="landing_block_text">Completed Initiatives</p>
                    </div>
                </div>

                <div className="open_initiatives_container w-7/8 h-fit max-h-1/3 flex flex-col self-center drop-shadow-lg">

                    <div className="text-xl self-start mt-1 w-full flex section_header"> 
                        <div className="flex items-center">
                            <p className="ml-3 section_title">Initiatives to do</p>
                        </div>
                        {/* <svg
                            className={`w-5 h-5 ml-auto mr-3 transform transition-transform duration-300 ${
                                expandAttentionSection ? 'rotate-180' : ''
                            }`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 9l-7 7-7-7" />
                        </svg> */}
                    </div>

                    <div className={`w-full h-full flex flex-col items-center section_body overflow-y-scroll`}>
                        {filteredInitiatives.map((initiative,index)=>(

                            <div className="task_item_container h-fit flex flex-col mb-2">
                                <div className={`unaccepted_task_item w-full h-fit flex flex-row justify-between sm:justify-start items-center`}>
                                    <div className="flex flex-col items-start w-full sm:w-1/3 justify-between sm:justify-start">
                                        <p className="text-sm sm:text-lg font-bold">{initiative.name}</p>
                                        {/*todo: do retrieve user function */}
                                        <p className="text-xs sm:text-sm">Lead: User</p>
                                    </div>

                                    <div className="sm:ml-auto flex flex-col w-fit items-center self-end">

                                        {/*todo: Add in edit button next to it*/}
                                        <select className="task_accept_select rounded-xl text-sm mr-1">
                                            {/*todo: also add in code to retrieve status*/}
                                            <option value="To-Do">To-Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>

                                        <p className="text-xs sm:text-sm">Due: {initiative.due_date}</p>
                                    </div>
                                </div>

                                <div className={`divider_bar w-full self-center ${(index !== filteredInitiatives.length - 1 || filteredInitiatives.length === 0) ? 'task_item_border_bottom' : 'hidden'}`}></div> 
                            </div>
                        ))
                        }
                    </div>


                </div>

                
                <div className="closed_initiatives_container w-7/8 h-1/4 max-h-1/3 flex flex-col self-center drop-shadow-lg mt-4">
                    <div className="text-xl self-start mt-1 w-full flex section_header"> 
                        <div className="flex items-center">
                            <p className="ml-3 section_title">Completed Initiatives</p>
                        </div>
                    </div>

                    <div className={`w-full h-full flex flex-col items-center section_body overflow-y-scroll`}>
                    
                        
                    </div>
                </div>
            </div>


            <FooterNav/>
        </div>
    </>)
}