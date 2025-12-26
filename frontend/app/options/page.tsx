"use client"

import Profile from "@/components/optionsComponent/Profile"
import { UserContext } from "@/context/UserContext/UserContext";
import { useContext, useEffect } from "react";
import { Auth } from "../auth/auth";

export default function OptionsPage() {

    const context = useContext(UserContext)
    if (!context) {
        throw new Error("UserContext must be used within UserProvider");
    }
    const { user, setUser } = context
    
    useEffect(()=>{
        if(!user){
            Auth()
        }
    },[user])

    return(
        <main className="relative h-sreen w-screen">
            <Profile user={user} setUser={setUser} />
        </main>
    )
}
