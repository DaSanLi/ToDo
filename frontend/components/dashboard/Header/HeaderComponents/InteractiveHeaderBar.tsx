'use client'
import options from '../../../../public/options.svg'
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"
import { UserContext } from "@/context/UserContext/UserContext"
import { URLBASE } from '@/scripts.ts/general-scripts/scripts'

function InteractiveHeaderBar() {
    const [optionsBar, setOptionsBar] = useState<boolean>(false)
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("UserContext must be used within UserProvider");
    }
    const { setUser } = context

    async function Logout (){
        await fetch(`${URLBASE}/auth/logout`, {credentials: 'include'})
        .then( () => setUser(null) )
        .catch(e => console.error("No se pudo cerrar la sesión", e))
    }

    return (
        <>
            <div className="absolute right-5 top-1.5 flex flex-row ">
                <button className="bg-(--color-primary) hover:bg-(--color-secondary) rounded-2xl p-2"
                    onClick={() => setOptionsBar(prev => !prev)}
                >
                    <Image
                        src={options}
                        alt="imagen de opciones"
                        width={25}
                        height={25}
                    />
                </button>
            </div>
            <aside className={`text-(--bg-secondary) absolute right-5 top-full mt-3 w-48 bg-(--color-primary) rounded-2xl shadow-lg flex flex-col gap-3 p-4 transition-all duration-300 ease-out
                    ${optionsBar
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }   
                    `}>
                <Link href='/auth/login'
                    className="w-full py-2 bg-white/20 rounded-xl text-sm text-center"
                    onClick={() => {Logout()}}>
                    Salir
                </Link>
                <Link href='/options'
                    className="w-full py-2 bg-white/20 rounded-xl text-sm text-center">
                    Opciones
                </Link>
            </aside>
        </>
    )
}

export default InteractiveHeaderBar