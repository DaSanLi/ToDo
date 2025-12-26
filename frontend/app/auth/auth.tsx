'use server'
import { redirect } from 'next/navigation'

export async function Auth() {
    redirect(`/auth/login`) 
}