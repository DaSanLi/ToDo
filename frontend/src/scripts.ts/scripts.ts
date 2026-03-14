import { ErrorFactory, FactoryError } from "./FactoryError";
import { FetchOptions } from "./types";

const URLBASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql";

const createErrorFromStatus = (res: Response): FactoryError => {
  const error = ErrorFactory.createError(res.status)
  error.toConsole()
  return error
}

const createConnectionError = (): FactoryError => {
  const error = ErrorFactory.createError(500, 'Error al conectar con la API')
  error.toConsole()
  return error
}

const processResponse = async <T>(res: Response): Promise<T> => {
  if (res.status === 401) {
    throw createErrorFromStatus(res)
  }
  if (res.status === 403) {
    throw createErrorFromStatus(res)
  }
  if (res.status === 400) {
    const data = await res.json().catch(() => ({}))
    throw ErrorFactory.createError(400, data.message || 'Datos inválidos')
  }
  if (res.status >= 500) {
    throw createErrorFromStatus(res)
  }
  
  if (!res.ok) {
    throw createErrorFromStatus(res)
  }
  return res.json() as Promise<T>
}

export const fetchApi = async <T>(endpoint: string = URLBASE, options: FetchOptions = {}): Promise<T | null> => {
  try {
    const res = await fetch(endpoint, options)
    return await processResponse<T>(res)
  } catch (error) {
    if (error instanceof FactoryError) {
      throw error
    }
    throw createConnectionError()
  }
}

export const fetchAuthApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T | null> => {
  try {
    const res = await fetch(`${URLBASE}/${endpoint}`, options)
    
    if (res.status === 401) {
      createErrorFromStatus(res)
      return null
    }
    
    return await processResponse<T>(res)
  } catch (error) {
    if (error instanceof FactoryError) {
      throw error
    }
    throw createConnectionError()
  }
}

export { URLBASE };
