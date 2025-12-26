import options from '../../public/options.svg'
import Image from "next/image"
import { useContext, useState } from "react"
import Link from "next/link"
import { UserContext } from "@/context/UserContext/UserContext"

const Header = () => {
    const [optionsBar, setOptionsBar] = useState<boolean>(false)
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("UserContext must be used within UserProvider");
    }
    const { setUser } = context


    return (
        <header className="fixed w-full h-fit top-0 mb-8">
            <section className="bg-(--bg-secondary) w-full h-full text-(--color-primary)">
                <h1 className="text-3xl font-bold p-2">
                    To-Do App
                </h1>
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
                    onClick={()=>setUser(null)}>
                        Salir
                    </Link>
                    <Link href='/options' 
                    className="w-full py-2 bg-white/20 rounded-xl text-sm text-center">
                        Opciones
                    </Link>
                </aside>
            </section>
        </header>
    )
}

export default Header