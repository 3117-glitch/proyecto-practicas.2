import { Injectable } from "@angular/core";

//importa CanActivate (interfaz usada para proteger rutas) y router (para redireccionar)
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

//importa el servicio de autenticación que contiene la logica para verificar roles de usuario
import { AuthService } from "../servicios/auth.service";

//declara la clase como inyectable y disponible en toda la aplicacion
@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
    //inyeccion de dependencias
    //- AuthService: para comprobar si el usuario tiene rol de administrador
    // - Router: para redirigir al usuario si no tiene permiso
    constructor(private authService: AuthService, private router: Router){}

    //metodo obligatorio de la interfaz canActivate , que decide si se puede acceder a una ruta
    canActivate(): boolean{
        //verifica si el usuario es administrador meiante el metodo del servicio de autenticacion
        if(this.authService.esAdmin()){
            //si el usuario tiene rol de admin se permite el acceso
            return true
        } else {
            //si no es administrador, muestra un mensaje e alerta 
            alert ('acceso denegado. Solo administradores pueden acceder a esta cuenta');

            //redirige al usuario a la pagina de inicio 
            this.router.navigate(['/inicio'])

            //devuelve false para bloquear el acceso a la ruta
            return false
        }
    }
}