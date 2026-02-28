import { createContext,useContext,useState,useEffect, type ReactNode } from "react";
import axios from "axios";
// import { supabase } from "./SupabaseClient";
import { testUsers, testTasks, testTasks2, taskAssignments, testClubs, clubMemberships} from "../assets/test_data";

export interface Task {
    task_id: number;
    club_id: number;
    event_id: number;
    // attachments:???
    due_date: string;
    task_name:string;
    description: string;
}

export interface Club {
    club_id: number;
    name: string;
    description:string;
}

export interface ClubMembership {
    user_id: number,
    club_id: number,
}

export interface TaskAssignment {
    assigner: number,
    assignee: number,
    task_id: number,
    accepted: boolean,
}

export interface user {
    user_id: number,
    username: string,
    email: string,
    phone_number: string,
    //add more fields as necessary
}

type userContextProps = {
    //user data, note to self, replace this with the actual user data interface we need 
    currUser:user,
    //make sure we are not trying to load uninitialized stuff
    isLoaded:boolean, 

    loginUser: (username:string) => void,

    logoutUser: () => void

    isClubPresident: boolean, 

    setIsClubPresident: React.Dispatch<React.SetStateAction<boolean>>,

    testDataLoaded: boolean,

    setTestDataLoaded: React.Dispatch<React.SetStateAction<boolean>>,

    consoleLogDebug: boolean,
}

const UserContext = createContext<userContextProps|undefined>(undefined)

export const useUserContext = ()=>{
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("UserContext incorrect usage, trying to access context before its defined")
    }
    return context
}


export const UserContextProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [currUser, setCurrUser] = useState({
        user_id: 1,
        username: "AssigneeUser",
        email: "AssigneeUser1@test.com",
        phone_number: "404-404-4040"
    },)

    const [isLoaded, setIsLoaded] = useState(true);

    //do check to see if the logged in user is the club president 
    const [isClubPresident, setIsClubPresident] = useState(true)

    const [testDataLoaded, setTestDataLoaded] = useState(false)

    const consoleLogDebug = false

    //check for user token
    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrUser(JSON.parse(storedUser));
            setIsLoaded(true)
        }
        else {
            setIsLoaded(true);
        }
    },[])

    //DEMO: populate local storage with test data ONCE when the component mounts
    useEffect(()=>{
        localStorage.setItem("test_users", JSON.stringify(testUsers))
        localStorage.setItem("test_tasks_org_1", JSON.stringify(testTasks))
        localStorage.setItem("test_tasks_org_2", JSON.stringify(testTasks2))
        localStorage.setItem("test_task_assignments", JSON.stringify(taskAssignments))
        localStorage.setItem("test_clubs", JSON.stringify(testClubs))
        localStorage.setItem("test_club_memberships", JSON.stringify(testClubs))
        setTestDataLoaded(true)
    },[])


    // const registerUser = async (username:string, email:string, phone_number: string, password:string) => {
    //     try {
    //         const { data, error } = await supabase.auth.signUp({
    //             email: email,
    //             password: password,
    //         });

    //         if (error) {
    //             console.error("Error registering user:", error.message);
    //             return;
    //         }

    //         console.log("User registered successfully:", data);
    //         // Optionally, you can log the user in immediately after registration
    //         loginUser(username);
    //     }catch(error){
    //         console.error("Unexpected error during registration:", error);
    //     }
    // }

    const loginUser = (username: string) => {
        console.log('logged in', username)
        // setUser(username);
        setIsLoaded(true);
    };

    const logoutUser = () => {
        console.log('logged out')
        // setUser("");
        setIsLoaded(true);
    };

    useEffect(() => {
    if (currUser) {
      localStorage.setItem('user', JSON.stringify(currUser));
    }
    
  }, [currUser]);


 
    return(<UserContext.Provider value ={{currUser, isLoaded,loginUser,logoutUser, isClubPresident, setIsClubPresident, testDataLoaded, setTestDataLoaded,consoleLogDebug}}>
        {children}
    </UserContext.Provider>)
}