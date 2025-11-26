import { Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { OfertasComponent } from './pagina/ofertas/ofertas.component';
import { ContactoComponent } from './pagina/contacto/contacto.component';
import { ProductosComponent } from './pagina/productos/productos.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { FavoritosComponent } from './pagina/favoritos/favoritos.component';
import { InformacionComponent } from './pagina/informacion/informacion.component';
import { CompraComponent } from './pagina/compras/compras.component';
import { ProductoDetalleComponent } from './pagina/producto-detalle/producto-detalle.component';
import { LoginComponent } from './pagina/login/login/login.component';


export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'ofertas', component: OfertasComponent},
    {path: 'contacto', component: ContactoComponent},  
    {path: 'carrito', component: CarritoComponent},  
    {path: 'favoritos', component: FavoritosComponent},
    {path: 'producto', component: ProductosComponent},
    {path: 'producto-detalle: id', component: ProductoDetalleComponent},
    {path: 'informacion', component: InformacionComponent},
    {path: 'compras', component: CompraComponent},
    {path: 'login', component: LoginComponent}
];
