import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  // URL base del backend para las rutas del carrito.
  private apiUrl = 'http://localhost/api_proyecto/public/carrito';

  // BehaviorSubject almacena el estado actual del carrito de forma reactiva.
  // Cualquier componente suscrito se actualiza automáticamente cuando cambia.
  private carritoSubject = new BehaviorSubject<any[]>([]);

  // Observable público para que otros componentes se suscriban.
  carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient) {}

  // -------------------------------------------------------------------
  // Agrega token del usuario a los headers para todas las peticiones.
  // -------------------------------------------------------------------
  private getHeaders() {
    const token = localStorage.getItem('token') ?? '';

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // ===============================================================
  // OBTENER CARRITO DESDE LA API
  // ===============================================================
  obtenerCarrito(): Observable<any[]> {
    // Llama al endpoint GET /carrito
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  // ===============================================================
  // CARGA INICIAL DEL CARRITO AL INICIAR LA APP O EL NAV
  // ===============================================================
  cargarCarrito(): void {
    this.obtenerCarrito().subscribe({
      next: items => {
        // Actualiza el observable con los items recibidos.
        this.carritoSubject.next(items);
      },
      error: () => {
        // Si falla, se vacía para evitar inconsistencias.
        this.carritoSubject.next([]);
      }
    });
  }

  // ===============================================================
  // PERMITE FORZAR EL CAMBIO DEL CARRITO DESDE AFUERA
  // ===============================================================
  setCarrito(items: any[]) {
    this.carritoSubject.next(items);
  }

  // ===============================================================
  // AGREGAR PRODUCTO AL CARRITO
  // ===============================================================
  agregarAlCarrito(producto: any): Observable<any> {

    // POST /carrito/agregar
    return this.http.post<any>(
      `${this.apiUrl}/agregar`,
      {
        id_producto: producto.id,
        cantidad: 1,
        precio_unitario: producto.precio
      },
      this.getHeaders()
    ).pipe(
      tap((r: any) => {
        // Si la respuesta incluye carrito actualizado, se propaga el cambio.
        if (r?.carrito) {
          this.carritoSubject.next(r.carrito);
        }
      })
    );
  }

  // ===============================================================
  // ACTUALIZAR CANTIDAD DE UN ÍTEM DEL CARRITO
  // ===============================================================
  actualizarCantidad(idDetalleCarrito: number, cantidad: number): Observable<any> {

    // PUT /carrito/actualizar/:id
    return this.http.put<any>(
      `${this.apiUrl}/actualizar/${idDetalleCarrito}`,
      { cantidad },
      this.getHeaders()
    ).pipe(
      tap((r: any) => {
        // Si viene carrito actualizado, lo enviamos al observable global.
        if (r?.carrito) {
          this.carritoSubject.next(r.carrito);
        }
      })
    );
  }

  // ===============================================================
  // ELIMINAR PRODUCTO DEL CARRITO
  // ===============================================================
  eliminarProducto(idDetalleCarrito: number): Observable<any> {

    // DELETE /carrito/eliminar/:id
    return this.http.delete<any>(
      `${this.apiUrl}/eliminar/${idDetalleCarrito}`,
      this.getHeaders()
    ).pipe(
      tap((r: any) => {
        // Actualización reactiva del estado del carrito.
        if (r?.carrito) {
          this.carritoSubject.next(r.carrito);
        }
      })
    );
  }

  // ===============================================================
  // VACIAR TODO EL CARRITO
  // ===============================================================
  vaciarCarrito(): Observable<any> {

    // DELETE /carrito/vaciar
    return this.http.delete<any>(
      `${this.apiUrl}/vaciar`,
      this.getHeaders()
    ).pipe(
      tap(() => {
        // Vacía el carrito global.
        this.carritoSubject.next([]);
      })
    );
  }

  //Metodo para obtener los productos del carrito con un arreglo
  obtenerProductos():{producto:Producto;cantidad:number}[]{
    return this.carritoSubject.getValue();
  }

  //Metodo para calcular el total a pagar (precio*cantidad de cada producto)
  //obtenerTotal(): number{
    //const productos =  this.carritoSubject.getValue();
    //Usamos reduce para sumar los subtotales de cada producto
    //return productos.reduce((total,item)=> total + item.producto.precio*item.cantidad, 0)
  //}

  //obtenertotal de la IA
  obtenerTotal(): number {
  const productos = this.carritoSubject.getValue();

  return productos.reduce((total, item) => {
    const precio = Number(item.precio_unitario) || 0;
    const cantidad = Number(item.cantidad) || 1;
    return total + precio * cantidad;
  }, 0);
}

}