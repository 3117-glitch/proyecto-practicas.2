import { Component } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { AuthService } from '../../servicios/auth.service';
//*import { FirestoreService } from '../../servicios/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contacto',
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
}

