import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  cantidadProductos: number = 0;
  // Información del usuario actualmente autenticado.
  usuario: any = null;
  constructor(private carritoService: CarritoService, protected clientesService : AuthService) { }
  ngOnInit(): void {


    this.usuario = this.clientesService.getUsuario();


    if (this.clientesService.isLoggedIn()) {
      this.carritoService.cargarCarrito();
    }

    this.carritoService.carrito$.subscribe({
      next: productos => {
        this.cantidadProductos = productos.reduce(
          (acc, item) => acc + Number(item.cantidad || 1),
          0
        );
      }
    });

   
    if (this.clientesService.loginEvent) {
      this.clientesService.loginEvent.subscribe(() => {
        this.usuario = this.clientesService.getUsuario();
        this.carritoService.cargarCarrito();
      });
    }

    
  }

  logout() {
    this.clientesService.logout();
    this.usuario = null;
    this.cantidadProductos = 0;
  }
}
