import { createContext,useContext,useState,useEffect, type ReactNode } from "react";
import axios from "axios";

type userContextProps = {
    user:string,

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