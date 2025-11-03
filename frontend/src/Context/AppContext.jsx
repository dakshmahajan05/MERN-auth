import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [userdata,setuserdata] = useState(null)



    const value ={
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userdata,setuserdata
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}