import { createContext,useContext,useState,useEffect, type ReactNode } from "react";
import axios from "axios";

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
    //add more fields as necessary
}

type userContextProps = {
    //user data, note to self, replace this with the actual user data interface we need 
    user:string,
    //make sure we are not trying to load uninitialized stuff
    isLoaded:boolean, 

    loginUser: (username:string) => void,

    logoutUser: () => void

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

    const [user,setUser] = useState("")
    const [isLoaded, setIsLoaded] = useState(false);

    //check for user token
    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoaded(true)
        }
        else {
            setIsLoaded(true);
        }
    },[])

    const loginUser = (username: string) => {
        console.log('logged in', username)
        setUser(username);
        setIsLoaded(true);
    };

    const logoutUser = () => {
        console.log('logged out')
        setUser("");
        setIsLoaded(true);
    };

    useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
     
    }
  }, [user]);


 
    return(<UserContext.Provider value ={{user,isLoaded,loginUser,logoutUser}}>
        {children}
    </UserContext.Provider>)
}