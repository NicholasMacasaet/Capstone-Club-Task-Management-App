import { useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext"
import { useEffect } from "react"


export const OrgAdminPage = () => {

    const navigate = useNavigate()
    
    //retrieve specific id for this org
    const {id} = useParams()

    //for permissions checking
    const {isClubPresident, isLoaded} = useUserContext()

    useEffect(() => {
        //trivial check to see if they're logged in or not 
        if (!isLoaded){
            navigate(`/`)
        } 
        //if a user tries to access the page and isn't a club prez, then immediately redirect them back to the home page
        if (!isClubPresident){
            navigate(`/club/home/${id}`)
        }

    },[isLoaded, isClubPresident])

    return(<>
        <div className="org_management w-full h-full">
            <h1>TEST YAYA HI!</h1>

        </div>
    </>)
}