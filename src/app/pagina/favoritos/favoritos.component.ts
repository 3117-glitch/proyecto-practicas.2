import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelos/producto.model';
import { FavoritosService } from '../../servicios/favoritos.service';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
    productoEnFavoritos: { producto: Producto; cantidad: number }[] = [];
    constructor(private favoritosService: FavoritosService) {}
  
    ngOnInit(): void {
      this.favoritosService.favoritos$.subscribe((productos) => {
        this.productoEnFavoritos = productos;
      });
    }
    quitarFavoritos(productoId: number){
    this.favoritosService.eliminarfavoritos(productoId); /*elimina un solo producto*/ 
  }
    vaciarFavoritos(){
      this.favoritosService.vaciarfavoritos();
    }
  }

