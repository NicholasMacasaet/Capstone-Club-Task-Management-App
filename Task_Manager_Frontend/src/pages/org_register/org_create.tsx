import { use, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export const CreateOrg = () => {
    //TODO: login checks when thats implemented
    const navigate = useNavigate()
    // const {user,isLoaded}  = useUserContext()

    // useEffect(()=>{
    //     if (isLoaded && !user){
    //         navigate("/")
    //     }
    // },[user,isLoaded])



    const [orgName, setOrgName] = useState("")
    const [orgDescription, setOrgDescription] = useState("")

    const packaged_data = {
        org_name: orgName,
        org_description: orgDescription
    }

    const handleOrgCreate = async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        try{
           // const data = await axios({
            //     method: 'post',
            //     url: (add api endpoint here when implemented)
            //     data: JSON.stringify(packaged_data),
            //     headers: {'Content-Type': 'application/json' }
            // })

            navigate('/home')
        }catch(error){
            console.error(error)
        }
    }

    return(<>
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex">
                <Link to="/orgs/landing" className="text-3xl justify-self-start self-start sm:self-center">
                        <p>←</p>
                </Link>

                <h1 className="landing_page_header w-full hidden sm:block justify-self-center">
                    Streamline
                </h1>
            </div>

            <p className="landing_page_header w-full text-4xl sm:hidden">
               Streamline
            </p>
            <div className="org_landing_page_wrapper h-full sm:h-1/2 w-full sm:w-3/4 flex justify-start rounded-xl flex-col">
                <form className="w-full h-full mt-5 flex flex-col" onSubmit={(e)=>handleOrgCreate(e)}>

                    <div className="form_group flex flex-col sm:flex-row justify-center p-1">
                        <label className="sm:self-center self-start text-xl" htmlFor="org_name">Org/Club Name:</label>
                        <input type="text" id="org_name" className="form_input rounded-xl p-1" name="org_name"></input>
                    </div>

                    {/* maybe here we could have something that lets you add emails */}

                    <div className="form_group flex flex-col justify-center p-1">
                        <label className="self-start text-xl" htmlFor="club_description">Description:</label>
                        <textarea className="w-full h-1/2 description rounded-xl p-1" name="org_description" id="club_description">

                        </textarea>
                    </div>

                    <div className="form_group w-full mt-10 flex justify-center">
                        <button type="submit" className="form_submit_button w-fit">
                            Create Org
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>)

}