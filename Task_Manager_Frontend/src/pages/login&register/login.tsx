import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom"


export const Login = () => {


    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const navigate = useNavigate()

    const handleLogin = async (event:React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault()

        const user = {
            username:username,
            password:password,
        }

        navigate("/orgs/landing")

        console.log("test")
    }

    return(<>
        <div className="login_page w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex">
                <Link to="/" className="text-3xl justify-self-start self-start sm:self-center">
                        <p>←</p>
                </Link>

                <h1 className="landing_page_header w-full hidden sm:block justify-self-center">
                    Login to Streamline
                </h1>
            </div>
             

            <p className="landing_page_header w-full text-4xl sm:hidden">
                Login to Streamline
            </p>

            <div className="login_form_desktop_wrapper rounded-xl h-1/2 w-3/4 flex justify-center hidden sm:flex ">
                <form className="h-1/3 w-full sm:w-4/5 mt-1 hidden sm:grid grid-cols-2 items-center mt-20" method="post" onSubmit={(e)=>handleLogin(e)}>
                
                    <label htmlFor="username" className="text-xl sm:text-2xl self-center ml-7 sm:ml-0 text-end">Username or Email:</label>

                    <input type="text" name="username" className="form_input_modified rounded-xl p-1 text-2xl sm:text-3xl w-4/5 sm:w-full self-center" onChange={(e)=>handleUsernameChange(e)}></input>

                
                    <label htmlFor="username" className="text-2xl sm:text-3xl self-center ml-7 sm:ml-0 text-end mt-2">Password:</label>

                    <input type="password" name="password" className="form_input_modified rounded-xl p-1 text-2xl sm:text-3xl w-4/5 sm:w-full self-center mt-2" onChange={(e)=>handlePasswordChange(e)}></input>


                <div className="col-span-2 flex justify-center items-center flex-col mt-2">
                    <button type="submit" className="login_submit_button">
                        Login
                    </button>
                </div>
                
            </form>

            </div>
            

            <form className="login_form h-full w-full sm:w-4/5 rounded-xl mt-1 flex sm:hidden flex-col items-center" method="post" onSubmit={(e)=>handleLogin(e)}>
                <div className="form_group w-full sm:w-2/3 mt-20 flex flex-col sm:flex-row ">
                    <label htmlFor="username" className="text-xl sm:text-2xl self-start ml-7 sm:ml-0">Username or Email:</label>

                    <input type="text" name="username" className="form_input rounded-xl p-1 text-2xl sm:text-3xl w-4/5 sm:w-full self-center" onChange={(e)=>handleUsernameChange(e)}></input>
                </div>


                <div className="form_group w-full sm:w-2/3 mt-10 flex flex-col sm:flex-row">
                    <label htmlFor="username" className="text-2xl sm:text-3xl self-start ml-7 sm:ml-0">Password:</label>

                    <input type="password" name="password" className="form_input rounded-xl p-1 text-2xl sm:text-3xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePasswordChange(e)}></input>
                </div>


                <div className="form_group w-full sm:w-2/3 mt-10 flex justify-center">
                    <button type="submit" className="login_submit_button">
                        Login
                    </button>
                </div>
                
            </form>
            
        </div>
    </>)
}