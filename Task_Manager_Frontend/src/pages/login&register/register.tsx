import  axios  from 'axios';
import { useEffect, useState, type ChangeEvent} from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from '../../../api/ constants';

export const Register = () => {


    const[username, setUsername] = useState("");

    const[email, setEmail] = useState("");
    const[validEmail, setValidEmail] = useState(true)

    const[phone_number, setPhoneNumber] = useState("");
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


    const handleRegistration = async(event:React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()

        try {
            console.log("hi")

            // const data = await axios({
            //     method: 'post',
            //     url: (add api endpoint here when implemented)
            //     data: JSON.stringify(packaged_data),
            //     headers: {'Content-Type': 'application/json' }
            // })
            alert("Registration Successful! Please log in")
            navigate("/login")

        }catch(error){
            console.error(error)
            if (error instanceof Error) {
                setError(error.message)
            }
        }

    }

    let all_filled = email && password && confirm_password

    let checks_cleared = validEmail && validPhoneNo && validPassword && passwordMatches


    return(<>
        <div className="login_page w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex flex-col sm:flex-row justify-center">
                <Link to="/" className="text-3xl justify-self-start self-start sm:self-center">
                    <p>←</p>
                </Link>
                <h1 className="landing_page_header w-full hidden sm:block justify-self-center">
                    Register for Streamline
                </h1>
            </div>

            <p className="landing_page_header w-full text-4xl sm:hidden">
                Register for Streamline
            </p>

            <div className="login_form_desktop_wrapper h-full sm:h-3/4 w-full sm:w-4/5 rounded-xl mt-1 hidden sm:flex flex-col items-center">

                <form className="w-full h-3/4 rounded-xl mt-1 hidden sm:grid grid-cols-2 " method="post" onSubmit={handleRegistration}>
                 
                    <label htmlFor="username" className="text-lg sm:text-xl self-center ml-7 sm:ml-0 justify-end text-right">Username:</label>

                    <input type="text" name="username" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleUsernameChange(e)} value={username}></input>

                
                    <label htmlFor="email" className="text-lg sm:text-xl self-center ml-7 sm:ml-0 text-right">Email:*</label>

                    <input type="text" name="email" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handleEmailChange(e)} value={email}placeholder="j.smth@yee.com"></input>
                

                
                    <label htmlFor="phone_number" className="text-1xl sm:text-xl self-center ml-7 sm:ml-0 whitespace-nowrap text-right">Phone Number:</label>

                    <input type="text" name="phone_number" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePhoneNumberChange(e)} value = {phone_number} placeholder="ex:000-000-0000"></input>

                    <label htmlFor="password" className="text-lg sm:text-xl self-center ml-7 sm:ml-0 text-right">Password:*</label>

                    <input type="password" name="password" className="form_input_modified rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePasswordChange(e)} value={password}></input>

                    <p className="text-xs col-span-2">(eight chars, one letter, one number, one special char)</p>
                
                 
                    <label htmlFor="confirm_password" className="text-lg sm:text-xl wrap self-center ml-7 sm:ml-0 whitespace-nowrap text-right">Confirm Password:*</label>

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
                        {all_filled&&
                        checks_cleared&&
                        <button type="submit" className="login_submit_button mb-1">
                            Register
                        </button>
                        }
                        {(!all_filled || !checks_cleared)&&
                        <button className="login_submit_disabled mb-1 text-slate-400" disabled>
                            Register
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

            
            <form className="login_form h-full w-full sm:w-4/5 rounded-xl mt-1 flex justify-start sm:hidden flex-col justify-start" method="post" onSubmit={handleRegistration}>
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
                    <label htmlFor="password" className="text-lg sm:text-xl self-start ml-7 sm:ml-0">Password:*</label>

                    <input type="password" name="password" className="form_input rounded-xl p-1 text-lg sm:text-xl w-4/5 sm:w-full self-center" onChange={(e)=>handlePasswordChange(e)} value={password}></input>

                    <p className="text-xs m">(eight chars, one letter, one number, one special char)</p>
                </div>


                 <div className="form_group w-full mt-2 sm:w-2/3 flex flex-col sm:flex-row">
                    <label htmlFor="confirm_password" className="text-lg sm:text-xl wrap self-start ml-7 sm:ml-0 whitespace-nowrap" >Confirm Password:*</label>

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
                        all_filled&&
                        checks_cleared&&
                        <button type="submit" className="login_submit_button mb-1">
                            Register
                        </button>
                        }

                        {(!all_filled || !checks_cleared)&&
                        <button className="login_submit_disabled mb-1 text-slate-400" disabled>
                            Register
                        </button>

                        }
                </div>
            </form>
            
        </div>
    </>)
}