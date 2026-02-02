import { AuthError } from "./AuthError"
import { InternalServerError } from "./InternalServerError"
import { PermissionsError } from "./PermissionsError"

export class FactoryExceptionHandler {
    static throwIfError(requestCode: number){
        //si el proyecto crecierá podria mapearse una lista con clave - valor => status code - Exception
        if(requestCode === 401){
            throw new AuthError("Credenciales o token invalido.", requestCode)            
        }else if(requestCode === 403){
            throw new PermissionsError("Permisos insuficientes.", requestCode)    
        }else if(requestCode === 500){
            throw new InternalServerError("Error del servidor.", requestCode)    
        }else{
            throw new Error("Se ha producido un error.")
        }
    }
}