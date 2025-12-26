"use client"
import Darshboard from '@/components/dashboard/darshboard'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext/UserContext'
import { Auth } from './auth/auth'

export default function Home() {

  const context = useContext(UserContext)
  if (!context) {
      throw new Error("UserContext must be used within UserProvider");
  }
  const { user } = context

  useEffect(()=>{
    if(!user){
      Auth()
    }
  },[user])

  return (
    <>
      <Darshboard />
    </>
  )
}
