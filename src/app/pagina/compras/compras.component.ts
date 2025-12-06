import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import { CarritoService } from '../../servicios/carrito.service';
@Component({
  selector: 'app-compra',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit {
  //Declaracion del formulario reactivo para la compra
  formularioCompra!: FormGroup;

  //Variable para almacenar el total de la compra(subtotal+envio)
  total!:number

  //Costo fijo de envio
  envio = 5000

  //indicador para saber si la factura ya fue generada
  facturaGenerada = false

  //Objeto que contiene la informacion de la factura generada
  factura: any

  //Controla la visibilidad del modal que muestra el PDF
  mostrarModal = false

  //Fuente segura para mostrar el PDF generado en el iframe (URL sanitizada)
  pdfSrc: SafeResourceUrl | undefined;

  constructor(
    private fb:FormBuilder,  // FormBuilder para crear el formulario activo
    private carritoService:CarritoService, //Servicio para manejar el carrito y obtener productos y total
    private sanitizer: DomSanitizer //Para sanitizar la URL del PDF y que angular lo permita mostrar
  ){}

  //Metodo que se ejecuta al inicializar el componente
  ngOnInit(): void {
    //Formulario con los campos requeridos y validadores
    this.formularioCompra = this.fb.group({
      nombre:['',Validators.required],
      direccion : ['',Validators.required],
      correo : ['',[Validators.required, Validators.email]],
      telefono : ['',Validators.required],
      codigoPostal : ['',Validators.required],
      ciudad : ['',Validators.required],
      provincia : ['',Validators.required],
      metodoPago : ['',Validators.required],
    })
  }
  //Calcula el total de la compra sumando el subtotal y el costo de envio
  calcularTotal():number{
    const subtotal = this.carritoService.obtenerTotal(); //Obtiene subtotal del carrito
    this.total = subtotal + this.envio;    
     return this.total
  }

  //Prepara los datos para la factura con cliente,productos, totales y fecha
  emitirFactura():void{
    const datosCliente = this.formularioCompra.value; //Datos ingresados del formulario
    const productos = this.carritoService.obtenerProductos(); //Productos del carrito
    const totalFinal = this.calcularTotal(); //Total calculado con envio

    // Construye el objeto factura con toda la info necesaria
    this.factura = {
      cliente: datosCliente,
      productos: productos,
      envio: this.envio,
      total: totalFinal,
      fecha: new Date()
    };

    //Marca que la factura fue generada
    this.facturaGenerada = true;
  }
  //Metodo que se ejecuta al finalizar la compra(click al boton)
  //Verifica validez del formulario, genera factura y muestra PDF
  finalizarCompra(): void{
    if(this.formularioCompra.valid){
      this.emitirFactura(); //Crea la factura
      this.generarPDFModal(); //Genera y muestra el PDF en modal
    }else{
      this.formularioCompra.markAllAsTouched(); //Marca todos los campos como tocados para mostrar errores
    }
  }

  //Genera el PDF con jsPDF y crea la URL para mostrar en iframe dentro del modal
/*   generarPDFModal():void{
    if(!this.factura) return; //Si no hay Factura, no hace nada

    const doc = new jsPDF(); //Crea instancia de jsPDF

    //Agrega titulo y fecha al PDF
    doc.setFontSize(18)
    doc.text('Factura de Compra',14,20)

    doc.setFontSize(12);
    doc.text(`Fecha: ${this.factura.fecha.toLocaleString()}`,14,30)

    doc.text('Cliente:',14,40);
    const c = this.factura.cliente;
    doc.text(`Nombre: ${c.nombre}`,20,50);
    doc.text(`Direccion: ${c.direccion}`,20,60);
    doc.text(`Correo: ${c.correo}`,20,70);
    doc.text(`Telefono: ${c.telefono}`,20,80);
    doc.text(`Ciudad: ${c.ciudad}`,20,90);
    doc.text(`Provincia: ${c.provincia}`,20,100);
    doc.text(`Codigo Postal: ${c.codigoPostal}`,20,110);
  
  
    let y = 120
    doc.text('Productos:',14,y)

    this.factura.productos.forEach((item:any, index:number) => {
      y += 10;
      doc.text(
        `${index+1}. ${item.producto.nombre} - Cantidad: ${item.cantidad} - Precio: ${item.producto.precio.toFixed(2)} - Subtotal: $${(item.producto.precio * item.cantidad).toFixed(2)}`,20,y)
    })
    
    //Costos finales
    y += 10;
    doc.text(`Costo de Envio: $${this.factura.envio.toFixed(2)}`,14,y);
    y += 10;
    doc.text(`Total a Pagar: $${this.factura.total.toFixed(2)}`,14,y);

  
    const pdfBlob = doc.output('blob')
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob))

    
    this.mostrarModal = true;
  }
 */

  //modal hecho con la IA 
generarPDFModal(): void {
  if (!this.factura) return;

  const doc = new jsPDF();

  // --- DATOS FACTURA ---
  doc.setFontSize(18);
  doc.text('Factura de Compra', 14, 20);

  doc.setFontSize(12);
  doc.text(`Fecha: ${this.factura.fecha.toLocaleString()}`, 14, 30);

  doc.text('Cliente:', 14, 40);
  const c = this.factura.cliente;

  doc.text(`Nombre: ${c.nombre}`, 20, 50);
  doc.text(`Direccion: ${c.direccion}`, 20, 60);
  doc.text(`Correo: ${c.correo}`, 20, 70);
  doc.text(`Telefono: ${c.telefono}`, 20, 80);
  doc.text(`Ciudad: ${c.ciudad}`, 20, 90);
  doc.text(`Provincia: ${c.provincia}`, 20, 100);
  doc.text(`Codigo Postal: ${c.codigoPostal}`, 20, 110);

  // --- PRODUCTOS ---
  let y = 120;
  doc.text('Productos:', 14, y);

  this.factura.productos.forEach((item: any, index: number) => {

  const nombre = item.producto?.nombre ?? "Producto sin nombre";
  const precio = item.producto?.precio ?? item.precio_unitario ?? 0;

  y += 10;
  doc.text(
    `${index + 1}. ${nombre} - Cantidad: ${item.cantidad} - Precio: $${precio.toFixed(2)} - Subtotal: $${(precio * item.cantidad).toFixed(2)}`,
    20,
    y
  );
});


  y += 10;
  doc.text(`Costo de Envio: $${this.factura.envio.toFixed(2)}`, 14, y);
  y += 10;
  doc.text(`Total a Pagar: $${this.factura.total.toFixed(2)}`, 14, y);

  // ---------- AQUI VA LA SOLUCIÓN 1 ----------
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);

  // Abre el PDF directo en otra pestaña (seguro / sin iframe)
  window.open(url, '_blank');
}


  
  cerrarModal(): void{
    this.mostrarModal = false;
    if(this.pdfSrc) {
      
      URL.revokeObjectURL((this.pdfSrc as any).changingThisBreaksApplicationSecurity)
      this.pdfSrc = undefined
    }
  }
  
  imprimirPDF(): void {
  const iframe = document.getElementById('pdfFrame') as HTMLIFrameElement;

  if (iframe && iframe.contentWindow) {
    setTimeout(() => {
      iframe.contentWindow!.focus();
      iframe.contentWindow!.print();
    }, 300);
  }
}

}