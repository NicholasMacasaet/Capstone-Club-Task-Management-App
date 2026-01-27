import { useState, type ChangeEvent } from "react"
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

    const handleLogin = async (event:React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault()

        const user = {
            username:username,
            password:password,
        }

        console.log("test")
    }

    return(<>
        <div className="login_page w-full h-full flex flex-col justify-start items-center">
            <h1 className="landing_page_header w-full hidden sm:block">
                Login to Streamline
            </h1>

            <p className="landing_page_header w-full text-4xl sm:hidden">
                Login to Streamline
            </p>


            <form className="login_form h-full w-full sm:w-4/5 rounded-xl mt-1 flex flex-col items-center" method="post" onSubmit={(e)=>handleLogin(e)}>

                <div className="form_group w-full sm:w-2/3 mt-20 flex flex-col sm:flex-row ">
                    <label htmlFor="username" className="text-2xl sm:text-3xl self-start ml-7 sm:ml-0">Username:</label>

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