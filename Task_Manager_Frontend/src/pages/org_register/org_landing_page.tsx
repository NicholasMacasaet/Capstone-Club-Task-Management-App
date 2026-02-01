import { Link } from "react-router-dom"
import {BASEURL} from '../../../api/ constants'

export const OrgLandingPage =()=>{

    return (<>
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
                <h2 className="mt-2">It seems you're not part of an org or club ...</h2>
                <div className="org_button_group w-full flex flex-col items-center justify-self-center h-fit mt-5">
                    <Link to="/orgs/create" className="org_landing_buttons rounded-xl"> 
                        Create Org
                    </Link>

                    <Link to="/orgs/join" className="org_landing_buttons rounded-xl mt-4"> 
                        Join Org
                    </Link>
                </div>
            </div>
        </div>
    </>)
}