
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
    quitarFavoritos(productoId: number) {
      throw new Error('Method not implemented.');
    }
    private favoritosSubject = new BehaviorSubject <{ producto: Producto; cantidad: number}[]>([])
    favoritos$= this.favoritosSubject.asObservable();
    agregarFavoritos(producto: Producto){
      const productos = this.favoritosSubject.getValue();
      const encontrado = productos.find(p=>p.producto.id === producto.id);
      if(encontrado){
        encontrado.cantidad++;
      }
      else{
        this.favoritosSubject.next([...productos, {producto,cantidad:1}])
      }
    }
    eliminarfavoritos(productoId:number){
    const productos=this.favoritosSubject.getValue().filter(p => p.producto.id !== productoId)
    this.favoritosSubject.next(productos)
  }
  vaciarfavoritos(){
    this.favoritosSubject.next([])
  }
    constructor() { }
  }
function of(arg0: boolean) {
  throw new Error('Function not implemented.');
}

