import { createContext } from 'react'
import { UserStateType } from '../types/types'


export const UserContext = createContext<UserStateType|null>(null)