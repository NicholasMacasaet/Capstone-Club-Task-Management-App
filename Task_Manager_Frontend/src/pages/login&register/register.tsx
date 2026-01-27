import { useState, type ChangeEvent} from "react";

export const Register = () => {


    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[phone_number, setPhoneNumber] = useState("");
    const[password, setPassword] = useState("");
    const[confirm_password, setConfirmPassword] = useState("");

    const handleUsernameChange = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setUsername(event.target.value);
    }
    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
 
    const handlePhoneNumberChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    }

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }


    return(<>
        <div className="login_page w-full h-full flex flex-col justify-start items-center">
            <h1 className="landing_page_header w-full hidden sm:block">
                Register for Streamline
            </h1>

            <p className="landing_page_header w-full text-4xl sm:hidden">
                Register for Streamline
            </p>

            <div className="login_form_desktop_wrapper h-full sm:h-1/2 w-full sm:w-4/5 rounded-xl mt-1 hidden sm:flex flex-col items-center">

                <form className="w-full h-3/4 rounded-xl mt-1 hidden sm:grid grid-cols-2" method="post">
                 
                    <label htmlFor="username" className="text-lg sm:text-xl self-center ml-7 sm:ml-0 justify-end text-right">Username:</label>

                    <input type="text" name="username" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleUsernameChange(e)}></input>
                


                
                    <label htmlFor="email" className="text-lg sm:text-xl self-center ml-7 sm:ml-0 text-right">Email:</label>

                    <input type="text" name="email" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleEmailChange(e)}></input>
                

                
                    <label htmlFor="phone_number" className="text-1xl sm:text-xl self-center ml-7 sm:ml-0 whitespace-nowrap text-right">Phone Number:</label>

                    <input type="text" name="phone_number" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePhoneNumberChange(e)}></input>

                    <label htmlFor="password" className="text-lg sm:text-xl self-center ml-7 sm:ml-0 text-right">Password:</label>

                    <input type="password" name="password" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePasswordChange(e)}></input>
                
                 
                    <label htmlFor="confirm_password" className="text-lg sm:text-xl wrap self-center ml-7 sm:ml-0 whitespace-nowrap text-right">Confirm Password:</label>

                    <input type="password" name="confirm_password" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleConfirmPasswordChange(e)}></input>
                </form>


                <button type="submit" className="login_submit_button mb-1">
                    Login
                </button>
            </div>

            
            <form className="login_form h-full w-full sm:w-4/5 rounded-xl mt-1 flex sm:hidden flex-col items-center" method="post">
                <div className="form_group w-full sm:w-2/3 mt-20 flex flex-col sm:flex-row ">
                    <label htmlFor="username" className="text-lg sm:text-xl self-start ml-7 sm:ml-0">Username:</label>

                    <input type="text" name="username" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleUsernameChange(e)}></input>
                </div>


                <div className="form_group w-full sm:w-2/3 mt-10 flex flex-col sm:flex-row ">
                    <label htmlFor="email" className="text-lg sm:text-xl self-start ml-7 sm:ml-0">Email:</label>

                    <input type="text" name="email" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleEmailChange(e)}></input>
                </div>

                <div className="form_group w-full sm:w-2/3 mt-10 flex flex-col sm:flex-row ">
                    <label htmlFor="phone_number" className="text-1xl sm:text-xl self-start ml-7 sm:ml-0 whitespace-nowrap">Phone Number:</label>

                    <input type="text" name="phone_number" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePhoneNumberChange(e)}></input>
                </div>


                <div className="form_group w-full sm:w-2/3 mt-10 flex flex-col sm:flex-row">
                    <label htmlFor="password" className="text-lg sm:text-xl self-start ml-7 sm:ml-0">Password:</label>

                    <input type="password" name="password" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePasswordChange(e)}></input>
                </div>


                 <div className="form_group w-full sm:w-2/3 mt-10 flex flex-col sm:flex-row">
                    <label htmlFor="confirm_password" className="text-lg sm:text-xl wrap self-start ml-7 sm:ml-0 whitespace-nowrap">Confirm Password:</label>

                    <input type="password" name="confirm_password" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleConfirmPasswordChange(e)}></input>
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