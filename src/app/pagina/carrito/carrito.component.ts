import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { Producto } from '../../modelos/producto.model';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit { 
    productoEnCarrito: { producto: Producto; cantidad: number }[] = [];
  router: any;
  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos) => {
      this.productoEnCarrito = productos;
    });

    this.calcularSubtotal();
  }
  agregarCantidad(index: number) {
    this.productoEnCarrito[index].cantidad++;
  }
  quitarCantidad(index: number) {
    if (this.productoEnCarrito[index].cantidad > 1) {
      this.productoEnCarrito[index].cantidad--;
    }
  }
  eliminarProducto(productoId: number){
    this.carritoService.eliminarDelCarrito(productoId);
  }
  vaciarCarrito(){
    this.carritoService.vaciarCarrito();
  }
  realizarCompra(){
    alert('compra realizada exitosamente');
    this.vaciarCarrito(); 
  }
  formularioCompra(){
  // Redirige al usuario a la ruta '/compra', donde se encuentra el formulario para finalizar la compra
  this.router.navigate(['/compras.component']);
}

// Calcula el total del carrito de compras
calcularTotal(): number{
  // Recorre el arreglo de productos en el carrito y suma el resultado de (precio*cantidad) de cada item
  return this.productoEnCarrito.reduce((total,item) =>{
    return total + item.producto.precio * item.cantidad
  },0)  // el acumulador 'total' comienza en 0
}

calcularSubtotal(): number {
    return this.productoEnCarrito.reduce((total, item) => {
    // Multiplica el precio del producto por la cantidad del item
    const precioUnitario = item.producto.precio || 0;
    const cantidad = item.cantidad || 0;
    return total + (precioUnitario * cantidad);
  }, 0);
  }
}