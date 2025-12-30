'use server'
import { UserInterface } from '@/app/auth/types/types';
import { fetchAuthApi } from '@/scripts.ts/general-scripts/scripts';
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers';


export default async function Home() {
    const cookieStore = await cookies();
    const cookieAuth = cookieStore.toString();
    const usuarioAutenticado: UserInterface|null = await fetchAuthApi<UserInterface>('auth/me', { credentials: 'include',
        headers: {Cookie: cookieAuth}
    })
    if (usuarioAutenticado) {
        redirect('/dashboard')
    } else {
        redirect('/auth/login')
    }
}
