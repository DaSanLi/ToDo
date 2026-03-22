'use client'
import { useCurrentUser } from '@/src/graphql/hooks/useCurrentUser'
import ProfileSection from '@/src/components/dashboard/Header/OptionsComponent/OptionsComponentParts/ProfileEdit/ProfileSection'
import ChangeThemeSection from '@/src/components/dashboard/Header/OptionsComponent/OptionsComponentParts/ChangeThemeEdit/ChangeThemeSection'
import ReturnDashBoard from '@/src/components/dashboard/Header/OptionsComponent/OptionsComponentParts/ReturnDashboardSection/ReturnDashBoard'

export default function OptionsContent() {
  const { user, loading, error } = useCurrentUser()

  if (loading) {
    return (
      <main className="h-sreen w-screen">
        <article className="w-full min-h-screen flex items-center justify-center bg-(--bg-primary)">
          <p className="text-(--text-primary)">Cargando...</p>
        </article>
      </main>
    )
  }

  if (error || !user) {
    return (
      <main className="h-sreen w-screen">
        <article className="w-full min-h-screen flex items-center justify-center bg-(--bg-primary)">
          <p className="text-(--text-primary)">Error al cargar usuario</p>
        </article>
      </main>
    )
  }

  return (
    <main className="h-sreen w-screen">
      <article className="w-full min-h-screen flex items-center justify-center bg-(--bg-primary) overflow-hidden px-2 sm:px-4 py-6">
        <section className="w-full max-w-full sm:max-w-lg rounded-2xl border border-(--border-color) p-4 sm:p-8 space-y-6 bg-(--bg-secondary) shadow-md overflow-auto">
          <div className="text-center">
            <div className="mx-auto mb-3 h-16 w-16 rounded-full flex items-center justify-center text-xl font-semibold bg-(--color-primary)/10 text-(--color-primary)">
              {user.fullName?.charAt(0) || '?'}
            </div>
            <h2 className="text-lg font-semibold text-(--text-primary)">{user.fullName}</h2>
            <p className="text-sm text-(--text-secondary)">{user.email}</p>
          </div>
          <hr className="border border-(--border-color)" />
          <ProfileSection userId={user.id} />
          <hr className="border border-(--border-color)" />
          <ChangeThemeSection />
          <hr className="border border-(--border-color)" />
          <ReturnDashBoard />
        </section>
      </article>
    </main>
  )
}
