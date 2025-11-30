import { Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { OfertasComponent } from './pagina/ofertas/ofertas.component';
import { ContactoComponent } from './pagina/contacto/contacto.component';
import { ProductosComponent } from './pagina/productos/productos.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { FavoritosComponent } from './pagina/favoritos/favoritos.component';
import { InformacionComponent } from './pagina/informacion/informacion.component';
import { CompraComponent } from './pagina/compras/compras.component';
import { LoginComponent } from './pagina/login/login/login.component';
import { TicketComponent } from './pagina/tickets/tickets.component';
import {AdminComponent} from './pagina/admin/admin.component'
import { AdminGuard } from './guards/admin.guard';


export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'ofertas', component: OfertasComponent},
    {path: 'contacto', component: ContactoComponent},  
    {path: 'carrito', component: CarritoComponent},  
    {path: 'favoritos', component: FavoritosComponent},
    {path: 'producto', component: ProductosComponent},
    {path: 'informacion', component: InformacionComponent},
    {path: 'compras', component: CompraComponent},
    {path: 'login', component: LoginComponent},
    {path: 'ticket', component: TicketComponent},
    {
    path: 'ticket/:id',
    loadComponent: () =>
      import('./pagina/tickets/tickets.component')
      .then(m => m.TicketComponent)
  },
  { 
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {path: 'compra', component: CompraComponent}
];
