import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //url base del modulo de productos de la api 
  private apiUrl= 'http://localhost:3000/api_proyect/products';


  constructor(private http: HttpClient) { }

  //construye las cabeceras http necesarias para la solicitudes protegidas}
  //si existe un token en localStorage, lo agrega a las cabeceras autorizada 
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });  

    return headers 
  }

  //obtiene la lista de productos desde la api
  //es una ruta publica y no requiere token
  getProduct(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
    .pipe(catchError(this.handleError));
  }
  
  //obtiene un producto especifico segun su certificado 
  getProductById(id:number): Observable<Producto>{
    return this.http.get<Producto>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }

  //envia un nuevo producto al servidor usando formdata
  //esto permite incluir archivos de imagen en la solicitud
  addProduct(formdata: FormData): Observable<any>{
    return this.http.post(this.apiUrl, formdata,{
      headers: this.getHeaders()
    })
    .pipe(catchError(this.handleError));
  }

//atualiza un producto segun su id
//esta operacion esta protegida y requiere un token valido
  updateProduct(id:number, productData: FormData): Observable<any>{
    return this.http.put(`$(this.apiUrl)/${id}`, FormData,{
      headers: this.getHeaders()
    })
    .pipe(catchError(this.handleError));
  }

  //elimina un producto segun su id
  //esta operacion estta protegida y requiere un token valido 
  deleteProduct(id:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
  })
  .pipe(catchError(this.handleError));
}

//manejo centralizado de errores para todas las solcitudes
//devuelve un mensaje en caso de fallo 
private handleError(error: any){
  console.error('error en ProductService:', error);
  let msg: 'ocurrio un error al procesar la solicitud';
  if(error.error?.message){
    msg = error.error.message;
  }
  return throwError(() => new error(msg))
}
}
