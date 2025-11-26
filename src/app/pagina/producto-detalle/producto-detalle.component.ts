import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent  implements OnInit{

  productId: any;
  product: any;

  constructor(private route: ActivatedRoute){

  }
  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

}
