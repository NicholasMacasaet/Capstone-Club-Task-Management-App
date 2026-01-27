import { Link } from "react-router-dom"

// import './App.css'
export const LandingPage = () => {

    return(<>
        <div className="landing_page w-full h-full flex flex-col justify-start">
            <h1 className="landing_page_header w-full hidden sm:block">
                Welcome to Streamline
            </h1>

            <p className="landing_page_header w-full text-4xl sm:hidden">
                Welcome to Streamline
            </p>

            <div className="w-full h-full flex flex-col justify-start items-center mt-22">
                <Link to="/login" className="landing_buttons w-1/2 sm:w-1/5 flex justify-center mb-2 rounded">
                    Login
                </Link>
                
                <Link to="/register" className="landing_buttons w-1/2 sm:w-1/5 flex justify-center rounded">
                    Register
                </Link>
            </div>

        </div>
    </>)
}