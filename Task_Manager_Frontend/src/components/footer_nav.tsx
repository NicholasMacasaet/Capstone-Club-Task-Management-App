import { useParams } from "react-router-dom"
import { testClubs, clubMemberships} from "../assets/test_data"
import { useEffect, useState } from "react"
import type { Club } from "../contexts/UserContext"
import { BASEURL } from "../../api/ constants"
import { useNavigate } from "react-router-dom"

export const FooterNav = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    //retrieve all orgs that the user is a part of, match that with the id in the thing, in the future this will be replaced with an api call to retrieve the clubs and club memberships
    //for now just return an array of the names since we're not sure that if we're going to have pictures in the data
    
    const [usersClubs, setUsersClubs] = useState<Club[]>([])

    useEffect(()=>{
        setUsersClubs(retrieveUsersClubs())
    },[id])

    const test_user_id: number = 1

    const retrieveUsersClubs = () => {
        let clubList: Club[] = []
        if (id){
            testClubs.map(club=>{
            //for every club, test to see if there is a membership for user with the id of <id>
            clubMemberships.map(membership=>{
                if (membership.user_id === test_user_id && membership.club_id === club.club_id){
                    clubList.push(club)
                }
            })
            })
        }
        return clubList
    }

    const switchClub = (idToSwitchTo: number) =>{
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