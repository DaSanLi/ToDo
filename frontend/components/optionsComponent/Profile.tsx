import { UserStateType } from "@/context/types/types";
import UpdateBlackScreen from "./UserInformationEdit/updateBlackScreen";
import { useState } from "react";
import UpdateBlackScreenTheme from "./switchThemes/updateBlackScreenTheme";
import Link from "next/link";

const Profile = ({ user }: UserStateType) => {

    const [ blackOptionScreen, setBlackOptionScreen ] = useState<boolean>(false)
    const [ blackOptionScreenTheme, setBlackOptionScreenTheme ] = useState<boolean>(false)

    return (
        <article className="w-full min-h-screen flex items-center justify-center bg-(--bg-primary) overflow-hidden px-2 sm:px-4 py-6">
            {blackOptionScreen && <UpdateBlackScreen blackOptionScreen={blackOptionScreen} setBlackOptionScreen={setBlackOptionScreen} />}
            {blackOptionScreenTheme && <UpdateBlackScreenTheme setBlackOptionScreenTheme={setBlackOptionScreenTheme} />}
            <section className="w-full max-w-full sm:max-w-lg rounded-2xl border border-(--border-color) p-4 sm:p-8 space-y-6 bg-(--bg-secondary) shadow-md overflow-auto">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto mb-3 h-16 w-16 rounded-full flex items-center justify-center text-xl font-semibold bg-(--color-primary)/10 text-(--color-primary)">
                        {user?.fullName.charAt(0)}
                    </div>
                    <h2 className="text-lg font-semibold text-(--text-primary)">{user?.fullName}</h2>
                    <p className="text-sm text-(--text-secondary)">{user?.email}</p>
                </div>
                <hr className="border border-(--border-color)" />
                {/* Perfil */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-(--text-primary)">Perfil</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <button onClick={() => setBlackOptionScreen(prev => !prev)}
                            className="w-full text-left px-4 py-2 rounded-xl border border-(--border-color) text-(--text-primary) bg-(--bg-primary) hover:bg-(--bg-secondary) transition text-sm font-medium">
                                Modificar datos de perfil
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="border border-(--border-color)" />
                {/* Configuración de la cuenta */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-(--text-primary)">Configuración de la cuenta</h3>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => setBlackOptionScreenTheme(prev => !prev)}
                        className="w-full text-left px-4 py-2 rounded-xl border border-(--border-color) text-(--text-primary) bg-(--bg-primary) hover:bg-(--bg-secondary) transition text-sm font-medium">
                            Cambiar tema
                        </button>
                    </div>
                </div>
                <hr className="border border-(--border-color)" />
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-(--text-primary)">Salir del panel de configuración</h3>
                    <div className="flex flex-col gap-3">
                        <Link href='/' className="w-full text-left px-4 py-2 rounded-xl border border-(--border-color) text-(--text-primary) bg-(--bg-primary) hover:bg-(--bg-secondary) transition text-sm font-medium">
                            Ir a inicio
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default Profile