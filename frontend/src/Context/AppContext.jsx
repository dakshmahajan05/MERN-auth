import { createContext, useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext()
import axios from "axios";

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [userdata,setuserdata] = useState(null)

    const getuserdata = async()=>{
        try {const {data} = await axios.get(backendUrl+'/api/user/data',{withCredentials:true})
            data.success ? setuserdata(data.userdata) : toast.error(data.message);


        } catch (error) {
            console.log(error.message);
            toast(error.message)
        }
    }

    const value ={
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userdata,setuserdata,
        getuserdata
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}