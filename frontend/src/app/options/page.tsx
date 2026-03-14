import { fetchApi } from "@/src/scripts.ts/scripts"
import { UserInterface } from "../auth/types/types"
import { cookies } from 'next/headers';
import ProfileSection from "@/src/components/dashboard/Header/OptionsComponent/OptionsComponentParts/ProfileEdit/ProfileSection";
import ChangeThemeSection from "@/src/components/dashboard/Header/OptionsComponent/OptionsComponentParts/ChangeThemeEdit/ChangeThemeSection";
import ReturnDashBoard from "@/src/components/dashboard/Header/OptionsComponent/OptionsComponentParts/ReturnDashboardSection/ReturnDashBoard";

export default async function OptionsPage() {
    const cookieStore = await cookies();
    const cookieAuth = cookieStore.toString();
    const usuarioAutenticado: UserInterface|null = await fetchApi<UserInterface>('auth/me', { credentials: 'include', 
        headers: { Cookie: cookieAuth }
    })

    return (
        <main className="h-sreen w-screen">
            <article className="w-full min-h-screen flex items-center justify-center bg-(--bg-primary) overflow-hidden px-2 sm:px-4 py-6">
                <section className="w-full max-w-full sm:max-w-lg rounded-2xl border border-(--border-color) p-4 sm:p-8 space-y-6 bg-(--bg-secondary) shadow-md overflow-auto">
                    {/* Header */}
                    <div className="text-center">
                    <div className="mx-auto mb-3 h-16 w-16 rounded-full flex items-center justify-center text-xl font-semibold bg-(--color-primary)/10 text-(--color-primary)">
                        {usuarioAutenticado?.fullName.charAt(0)}
                    </div>
                    <h2 className="text-lg font-semibold text-(--text-primary)">{usuarioAutenticado?.fullName}</h2>
                    <p className="text-sm text-(--text-secondary)">{usuarioAutenticado?.email}</p>
                </div>
                    <hr className="border border-(--border-color)" />
                    {/* Perfil */}
                    <ProfileSection />
                    <hr className="border border-(--border-color)" />
                    {/* Cambiar tema de la aplicación */}
                    <ChangeThemeSection />
                    <hr className="border border-(--border-color)" />
                    {/* Regresar al dashboard */}
                    <ReturnDashBoard />
                </section>
            </article>
        </main>
    )
}
