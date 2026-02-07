import { Link } from "react-router-dom"

export const Settings = () => {
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
            
        </div>
    </>)
}