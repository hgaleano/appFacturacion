import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ClienteResponse } from '../interfaces/clienteResponse';
import { DetalleFacturaResponse } from '../interfaces/detalleFacturaResponse';
import { FacturacionService } from '../services/facturacion.service';

@Component({
  selector: 'app-nueva-factura',
  templateUrl: './nueva-factura.page.html',
  styleUrls: ['./nueva-factura.page.scss'],
})
export class NuevaFacturaPage implements OnInit {
clientes:ClienteResponse[]=[];
fecha_actual=new Date().toISOString().slice(0, 10);
clienteSeleccionado:any;
cod_factura:any
detalle_factura:DetalleFacturaResponse[]=[];
total_pagar:number=0;
  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private service_factura:FacturacionService,
    private alertController:AlertController
  ) { }

  ngOnInit() {
    this.getClientes();
    console.log("cod_factura:"+this.cod_factura);
    
  }

  async generar_factura(){

     if(this.clienteSeleccionado == undefined){
        this.Alerta("Debe seleccionar un cliente.");
        return
     }

    const controller = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'crescent'
    });

    await controller.present();
    this.service_factura.crearFactura(this.fecha_actual,this.clienteSeleccionado).subscribe( (res) => {
      controller.dismiss();
      console.log(res);
     
      localStorage.setItem("cod_factura",res);
      this.cod_factura=localStorage.getItem("cod_factura");
    },
    error=>{
       controller.dismiss();
      console.log(error.error.message);

    }
    
    );
  }
  agregar_detalle(){
    let navigationExtras:NavigationExtras={
      state:{
          cod_factua:this.cod_factura
      }
    };
    this.router.navigate(['/agregar-detalle-factura'],navigationExtras);
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter");
    this.getDetalleFactura(localStorage.getItem("cod_factura"));
    
  }

  total(){
    this.total_pagar=0;
    for (let item of this.detalle_factura){
      this.total_pagar = +this.total_pagar  + +item.precio
      console.log(item.precio);
    }
  }

  finalizarVenta(){
   localStorage.removeItem("cod_factura");
    this.router.navigate(['/home']);
  }

  async Alerta(message:string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async getClientes() {

    const controller = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'crescent'
    });

    await controller.present();
    this.service_factura.getClientes().subscribe( (res) => {
      controller.dismiss();
      this.clientes=res;
      console.log(res);
    },
    error=>{
       controller.dismiss();
      console.log(error.error.message);

    }
    
    );

  }

  async getDetalleFactura(id:any) {

    const controller = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'crescent'
    });

    await controller.present();
    this.service_factura.getDetalleFactura(id).subscribe( (res) => {
      controller.dismiss();
      this.detalle_factura=res;
      console.log(res);
      this.total();
    },
    error=>{
       controller.dismiss();
      console.log(error.error.message);

    }
    
    );

  }
}
