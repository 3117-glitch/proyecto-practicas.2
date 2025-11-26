import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //url base del modulo de usuarios de la api 
  private apiUrl= 'http://localhost:3000/api_proyect/users';

  constructor(private http: HttpClient) { }

  //envia las credenciales al backend y retorna la respuesta
  login(datos:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, datos);
  }

  //envia los datos del nuevo usuario al backend para registrar una cuenta
  register(datos:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datos);
  }

  //guarda el token y el rol del usuario en el almacenamiento local
  guardarSesion(token: string, rol: string) {
    localStorage.setItem('rol', rol)
    localStorage.setItem('token', token);
  }

  //retorna el rol almacenado, o null si nno existe
  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  //indica si el usuario actual tiene rol de administrador
  esAdmin(): boolean{
    return localStorage.getItem('rol') === 'admin';
  }

  //elimina los datos de la sesion de la sesion almacenados
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }
}
