import { useParams } from "react-router-dom"
import { testClubs, clubMemberships} from "../assets/test_data"
import { use, useEffect, useState } from "react"
import type { Club, user } from "../contexts/UserContext"
import { BASEURL } from "../../api/ constants"
import { useNavigate } from "react-router-dom"
import { useUserContext} from "../contexts/UserContext"
import { retrieveAndParseCurrUser, setCurrClubIDLocalStorage } from "../demo_utils/getters_and_setters"


export const FooterNav = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    //retrieve all orgs that the user is a part of, match that with the id in the thing, in the future this will be replaced with an api call to retrieve the clubs and club memberships
    //for now just return an array of the names since we're not sure that if we're going to have pictures in the data
    const {isLoaded} = useUserContext()

    const [currUser, setCurrUser] = useState<user>()

    useEffect(()=>{
        const curr_user: user | null = retrieveAndParseCurrUser()
        if (curr_user){
            setCurrUser(curr_user)
        }
    },[isLoaded])
    
    const [usersClubs, setUsersClubs] = useState<Club[]>([])

    useEffect(()=>{
        if (currUser){
            const clubs = retrieveUsersClubs()
            setUsersClubs(clubs)
        }
    },[id,currUser])

    const retrieveUsersClubs = () => {
        let clubList: Club[] = []
        if (id){
            testClubs.map(club => {
            //for every club, test to see if there is a membership for user with the id of <id>
            clubMemberships.map(membership=>{
                if (membership.user_id === currUser?.user_id && membership.club_id === club.club_id){
                    clubList.push(club)
                }
            })
            })
        }
        return clubList
    }

    const switchClub = (idToSwitchTo: number) =>{
        
        // localStorage.setItem("curr_club_id", JSON.stringify(idToSwitchTo))
        setCurrClubIDLocalStorage(idToSwitchTo)
        console.log("test")
        navigate(`/club/home/${idToSwitchTo}`)
    }

    return(<>
    <div className="footer_nav w-full sm:w-3/4 mt-1 flex justify-center p-1">
        <div className="club_switch">
        {usersClubs.map(club=>(
            <button className={`club_button rounded-xl mr-0.5 ml-0.5 ${id && club.club_id === parseInt(id,10)? "selected_club":""}`} onClick={()=>switchClub(club.club_id)}>
                {club.name}
            </button>
        ))
        }

        </div>
    </div>
    
    </>)
}