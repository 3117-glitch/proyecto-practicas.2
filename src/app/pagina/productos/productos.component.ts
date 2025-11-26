import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../../modelos/producto.model';
import { CarritoService } from '../../servicios/carrito.service';
import { FavoritosService } from '../../servicios/favoritos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Aceite 5W30',
      descripcion: 'El aceite 5W30 es un aceite de motor multigrado que se utiliza en motores de gasolina y diésel.',
      precio: 1200,
      imagen: 'https://assets.unileversolutions.com/recipes-v2/237001.jpg',
      disponibilidad: true,
      categoria: 'Aceites',
      marca: 'Ford',
    },
    {
      id: 2,
      nombre: 'Aceite 15W40',
      descripcion: 'El aceite de auto 15W40 es un lubricante multifuncional ampliamente utilizado en motores de combustión interna.',
      precio: 12000,
      imagen: 'https://parrilladascolumbus.com/wp-content/uploads/2018/08/bife-chorizo.jpg',
      disponibilidad: true,
      categoria: 'Aceites',
      marca: 'Ford',
    },
    {
      id: 3,
      nombre: 'Aceite 10W40',
      descripcion: 'El aceite de auto 10W40 es un tipo de lubricante multigrado que se utiliza en una amplia gama de vehículos, tanto de gasolina como diésel.',
      precio: 15000,
      imagen: 'https://media.c5n.com/p/d543855f7406da67b2ec9113d7f2c741/adjuntos/326/imagenes/000/169/0000169686/1200x675/smart/asado.jpg',
      disponibilidad: true,
      categoria: 'Aceites',
      marca: 'Chevrolet',
    },
    {
      id: 4,
      nombre: 'Aceite 8090',
      descripcion: 'El aceite de auto 8090 (80W-90) es un lubricante diseñado para aplicaciones en sistemas de transmisión, cajas de cambio y diferenciales.',
      precio: 8500,
      imagen: 'https://imag.bonviveur.com/milanesa-a-la-napolitana.jpg',
      disponibilidad: true,
      categoria: 'Aceites',
      marca: 'Hilux',
    },
    {
      id: 5,
      nombre: 'Filtro de Aceite',
      descripcion: 'protege el motor reteniendo contaminantes del lubricante para evitar el desgaste prematuro.',
      precio: 8000,
      imagen: 'https://recetinas.com/wp-content/uploads/2022/09/locro.jpg',
      disponibilidad: true,
      categoria: 'Kit de filtros',
      marca: 'Hilux',
    },
    {
      id: 6,
      nombre: 'Filtro de Aire',
      descripcion: 'garantiza que el aire que entra al motor esté limpio, evitando partículas que podrían dañar el sistema de admisión.',
      precio: 10500,
      imagen: 'https://cuk-it.com/wp-content/uploads/2025/02/matambre-pizza-parrilla.webp',
      disponibilidad: true,
      categoria: 'Kit de filtros',
      marca: 'sin nada',
    },
    {
      id: 7,
      nombre: 'Filtro de combustible',
      descripcion: 'evita que impurezas lleguen a los inyectores y a la bomba de combustible.',
      precio: 8500,
      imagen: 'https://imag.bonviveur.com/provoleta.jpg',
      disponibilidad: true,
      categoria: 'Kit de filtros',
      marca: 'sin nada',
    },
    {
      id: 8,
      nombre: 'Filtro de habitáculo',
      descripcion: 'limpia el aire que circula dentro del vehículo, mejorando la calidad del aire en el interior.',
      precio: 9000,
      imagen: 'https://imag.bonviveur.com/pollo-al-disco.jpg',
      disponibilidad: true,
      categoria: 'Kit de filtros',
      marca: 'sin nada',
    },
    {
      id: 9,
      nombre: 'Puchero criollo',
      descripcion: 'Cocido con carne, chorizo, papa, batata, zapallo y repollo',
      precio: 10500,
      imagen: 'https://lapostadelnoroeste.com.ar/wp-content/uploads/2023/10/puchero-700x445.png',
      disponibilidad: true,
      categoria: 'platos principales',
      marca: 'sin nada',
    },
    {
      id: 10,
      nombre: 'Bondiola braseada',
      descripcion: 'Corte de cerdo tierno y jugoso, cocido lentamente, con puré o papas rústicas',
      precio: 11000,
      imagen: 'https://www.infobae.com/new-resizer/ZQ8XCGK3IvuqwYvRx1HaSBNX5BI=/arc-anglerfish-arc2-prod-infobae/public/7J3PG6IFFBGJDK777JK42EFEI4.jpg',
      disponibilidad: true,
      categoria: 'parrilla',
      marca: 'sin nada',
    },

  ];
p: any;
producto: any;
  constructor(
    private carritoService: CarritoService,
    private favoritosService: FavoritosService
  ) {}

  //metodo para agregar un producto al carrito
  agregar(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto);
    alert('producto agregado al carrito'); //muestra el mensaje
  }
  agregarFavoritos(producto: Producto) {
    this.favoritosService.agregarFavoritos(producto);
    alert('producto agregado a favoritos'); //muestra el mensaje
  }
  

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedBrand: string = '';
  minPrecio: number | null = null;
  maxPrecio: number | null = null;
  get categories(): string[] {
    return [...new Set(this.productos.map(p => p.categoria))];
  }


  onSearch(event: Event): void {
    event.preventDefault();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.minPrecio = null;
    this.maxPrecio = null;
  }

  get filteredProducts(): Producto[] {
    return this.productos.filter(p => 
      (this.searchTerm === '' || p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedCategory === '' || p.categoria === this.selectedCategory) &&
      (this.minPrecio === null || p.precio >= this.minPrecio) &&
      (this.maxPrecio === null || p.precio <= this.maxPrecio) )
  }

}
