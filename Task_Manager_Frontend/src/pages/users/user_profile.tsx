
import { useState, useEffect, type ChangeEvent, use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { testUsers } from "../../assets/test_data";
import {type user} from "../../contexts/UserContext";
/**
 * Basically just the registration form but for user profile editing
 */
export const UserProfile = () => {

    /**
     * Differences:
     * username, email, phone number are pre-filled with current user info that we query 
     * when any field is changed, we send a patch request to update that field in the backend (or we can wait until they click 'save changes' and then send one patch request with all the updated info, not sure which is better for UX)
     * the only fields that aren't filled out are password and confirm password for security reasons, if the user wants to change their password, they can fill out those fields and we can validate them the same way as in registration and then send a patch request to update the password if the checks are cleared
     * 
     * when a user updates ANY field, that is when we re-enable the 'confirm changes' button, and when they click it, we send a patch request to update all the fields at once (even if they only changed one field, we can just send all the info in the request body and then update the fields that are different in the backend)
     * 
     * 
     */

    //current user, just hard coded for testing purposes, replace with actual user query later
    const testUser:user = testUsers[0] //replace with actual user data query later

    const[username, setUsername] = useState(testUser.username);

    const[email, setEmail] = useState(testUser.email);
    const[validEmail, setValidEmail] = useState(true)

    const[phone_number, setPhoneNumber] = useState(testUser.phone_number);
    const[validPhoneNo, setValidPhoneNo] = useState(true)

    const[password, setPassword] = useState("");
    const[validPassword,setValidPassword] = useState(true)

    const[confirm_password, setConfirmPassword] = useState("");
    const[passwordMatches,setPasswordMatches]= useState(true)

    //https://regexr.com/3e48o
    const email_regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    //https://webrockstar.net/2017/08/regex-north-american-phone-number/
    const phone_no_regex: RegExp = /[\s\(]*((?!1)\d{1})((?!11)\d{2})[-\s\).,]*((?!1)\d{1})\d{2}[-\s.,]*\d{4}[\s]*/;

    // Source - https://stackoverflow.com/a
    // Posted by Srinivas, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-01-28, License - CC BY-SA 4.0
    // eight chars, one letter, one number, one special char
    const password_regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/



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

    //check if this is a valid email when its nonempty using a regex
    useEffect(() => {   
        if (email!==""){
            setValidEmail(email_regex.test(email))
        }
    },[email])


    useEffect(()=>{
        if (phone_number !==""){
            setValidPhoneNo(phone_no_regex.test(phone_number))
        }
    },[phone_number])

    useEffect(()=>{
        if (password !== ""){
            setValidPassword(password_regex.test(password))
        }
    },[password])

    useEffect(()=>{
        
        setPasswordMatches(password === confirm_password)
        
    },[password,confirm_password])

    const[error, setError] = useState("")


    const packaged_data ={
        username: username,
        email: email,
        phone_number: phone_number,
        password: password,
        confirm_password: confirm_password
    }

    let navigate = useNavigate()


    const handleInfoUpdate = async(event:React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()

        try {
            console.log("hi")

            // const data = await axios({
            //     method: 'patch',
            //     url: (add api endpoint here when implemented)
            //     data: JSON.stringify(packaged_data),
            //     headers: {'Content-Type': 'application/json' }
            // })
            navigate("/home")

        }catch(error){
            console.error(error)
            if (error instanceof Error) {
                setError(error.message)
            }
        }

    }

    let any_change = username !== testUser.username || email !== testUser.email || phone_number !== testUser.phone_number || password !== "" || confirm_password !== ""

    let checks_cleared = validEmail && validPhoneNo && validPassword && passwordMatches


    return(<>
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex">
                <Link to="/home" className="text-3xl justify-self-start self-start sm:self-center">
                        <p>←</p>
                </Link>

                <h1 className="landing_page_header w-full hidden sm:block justify-self-center">
                    Profile
                </h1>
            </div>

            <p className="landing_page_header w-full text-4xl sm:hidden">
               Profile
            </p>

            <div className="login_form_desktop_wrapper h-full sm:h-3/4 w-full sm:w-4/5 rounded-xl mt-1 hidden sm:flex flex-col items-center">

                <form className="w-full h-3/4 rounded-xl mt-1 hidden sm:grid grid-cols-2 " method="post" onSubmit={handleInfoUpdate}>
                 
                    <label htmlFor="username" className="text-lg sm:text-xl self-center ml-7 sm:ml-0 justify-end text-right">Username:</label>

                    <input type="text" name="username" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleUsernameChange(e)} value={username}></input>

                
                    <label htmlFor="email" className="text-lg sm:text-xl self-center ml-7 sm:ml-0 text-right">Email:*</label>

                    <input type="text" name="email" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleEmailChange(e)} value={email}placeholder="j.smth@yee.com"></input>
                

                
                    <label htmlFor="phone_number" className="text-1xl sm:text-xl self-center ml-7 sm:ml-0 whitespace-nowrap text-right">Phone Number:</label>

                    <input type="text" name="phone_number" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePhoneNumberChange(e)} value = {phone_number} placeholder="ex:000-000-0000"></input>

                    <label htmlFor="password" className="text-lg sm:text-xl self-center ml-7 sm:ml-0 text-right">New Password:*</label>

                    <input type="password" name="password" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePasswordChange(e)} value={password}></input>

                    <p className="text-xs col-span-2">(eight chars, one letter, one number, one special char)</p>
                
                 
                    <label htmlFor="confirm_password" className="text-lg sm:text-xl wrap self-center ml-7 sm:ml-0 whitespace-nowrap text-right">Confirm New Password:*</label>

                    <input type="password" name="confirm_password" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleConfirmPasswordChange(e)} value={confirm_password}></input>


                    <div className="col-span-2 flex justify-center items-center flex-col">

                        <div className="w-full flex flex-col errors">
                            * denotes required fields
                            {!validEmail &&
                            email!==""&&
                            <div className="text-rose-400 flex justify-center">
                                Error: invalid email
                            </div>

                            }
                            {!validPhoneNo&&
                            phone_number!==""&&
                            <div className="text-rose-400 flex justify-center">
                                Error: invalid phone number format
                            </div>
                            }

                            {!validPassword&&
                            password!==""&&
                            <div className="text-rose-400 flex justify-center">
                                Error: invalid password
                            </div>
                            }

                            {!passwordMatches&&
                            confirm_password!==""&&
                            <div className="text-rose-400 flex justify-center">
                                Error: Passwords doesn't match
                            </div>
                            }
                        </div>
                        {any_change&&
                        checks_cleared&&
                        <button type="submit" className="confirm_user_changes_button mb-1">
                            Confirm Changes
                        </button>
                        }
                        {(!any_change || !checks_cleared)&&
                        <button className="confirm_user_changes_button_disabled mb-1 text-slate-400" disabled>
                            Confirm Changes
                        </button>

                        }
                    </div>
                </form>

                {
                    error && 
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }

        

            </div>

            
            <form className="login_form h-full w-full sm:w-4/5 rounded-xl mt-1 flex justify-start sm:hidden flex-col justify-start" method="post" onSubmit={handleInfoUpdate}>
                <div className="form_group w-full sm:w-2/3 mt-10 flex flex-col sm:flex-row ">
                    <label htmlFor="username" className="text-lg sm:text-xl self-start ml-7 sm:ml-0">Username:</label>

                    <input type="text" name="username" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleUsernameChange(e)} value={username}></input>
                </div>


                <div className="form_group w-full mt-10sm:w-2/3 mt-2 flex flex-col sm:flex-row ">
                    <label htmlFor="email" className="text-lg sm:text-xl self-start ml-7 sm:ml-0">Email:*</label>

                    <input type="text" name="email" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleEmailChange(e)} value={email} placeholder="j.smth@yee.com"></input>
                </div>

                <div className="form_group w-full sm:w-2/3 flex mt-2 flex-col sm:flex-row ">
                    <label htmlFor="phone_number" className="text-1xl sm:text-xl self-start ml-7 sm:ml-0 whitespace-nowrap" >Phone Number:</label>

                    <input type="text" name="phone_number" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePhoneNumberChange(e)} value={phone_number} placeholder="ex:000-000-0000"></input>
                </div>


                <div className="form_group w-full sm:w-2/3 mt-2 flex flex-col sm:flex-row">
                    <label htmlFor="password" className="text-lg sm:text-xl self-start ml-7 sm:ml-0">New Password:*</label>

                    <input type="password" name="password" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePasswordChange(e)} value={password}></input>

                    <p className="text-xs m">(eight chars, one letter, one number, one special char)</p>
                </div>


                 <div className="form_group w-full mt-2 sm:w-2/3 flex flex-col sm:flex-row">
                    <label htmlFor="confirm_password" className="text-lg sm:text-xl wrap self-start ml-7 sm:ml-0 whitespace-nowrap" >Confirm New Password:*</label>

                    <input type="password" name="confirm_password" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleConfirmPasswordChange(e)} value={confirm_password}></input>
                </div>

                <div className="w-full flex flex-col errors">
                    * denotes required fields
                    {!validEmail &&
                    email!==""&&
                    <div className="text-rose-400 flex justify-center">
                        Error: invalid email
                    </div>

                    }
                    {!validPhoneNo&&
                    phone_number!==""&&
                    <div className="text-rose-400 flex justify-center">
                        Error: invalid phone number format
                    </div>
                    }

                    {!validPassword&&
                    password!==""&&
                    <div className="text-rose-400 flex justify-center">
                        Error: invalid password
                    </div>
                    }

                    {!passwordMatches&&
                    confirm_password!==""&&
                    <div className="text-rose-400 flex justify-center">
                        Error: Passwords doesn't match
                    </div>
                    }
                </div>


                <div className="form_group w-full sm:w-2/3 mt-10 flex justify-center">
                    {
                        any_change&&
                        checks_cleared&&
                        <button type="submit" className="confirm_user_changes_button mb-1">
                            Confirm Changes
                        </button>
                        }

                        {(!any_change || !checks_cleared)&&
                        <button className="confirm_user_changes_button_disabled mb-1 text-slate-400" disabled>
                            Confirm Changes
                        </button>

                        }
                </div>
            </form>

            
        </div>
    </>)
}