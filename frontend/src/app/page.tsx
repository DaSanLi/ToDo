'use server'
import { UserInterface } from '@/src/app/auth/types/types';
import { fetchApi, fetchAuthApi } from '@/src/scripts.ts/scripts';
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers';
import { FetchOptions } from '../scripts.ts/types';


export default async function Home() {
    const cookieStore = await cookies();
    const cookieAuth = cookieStore.toString();
    const token = cookieStore.get('token')?.value;

    if(!token){
        redirect('/auth/login')
    }else{
        redirect('/dashboard')
    }

    // const query = `
    //   query Verification {
    //     verification {
    //       message
    //       email
    //     }
    //   }
    // `;
    // const options: FetchOptions = {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Cookie": cookieAuth // Pasamos todas las cookies para que el backend lea el token
    //     },
    //     body: JSON.stringify({ query }) 
    // };
    
    // const response = await fetchApi<{ data: { verification: { message: string, email: string } } | null }>("", options);
    // const usuarioValido = response?.data?.verification;

}
