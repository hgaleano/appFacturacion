import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ClienteResponse } from '../interfaces/clienteResponse';
import { ServicioResponse } from '../interfaces/servicioResponse';
import { FacturacionService } from '../services/facturacion.service';
@Component({
  selector: 'app-agregar-detalle-factura',
  templateUrl: './agregar-detalle-factura.page.html',
  styleUrls: ['./agregar-detalle-factura.page.scss'],
})
export class AgregarDetalleFacturaPage implements OnInit {
 servicios:ServicioResponse[]=[];
 servicioSeleccionado: any;
 cantidad:any;
 precio:any;
 dato:any;
  constructor(
    private router: Router,
    private loadingController:LoadingController,
    private service_factura:FacturacionService,
    private route: ActivatedRoute,
  ) {
    
    this.dato=this.router.getCurrentNavigation()?.extras.state; 
   console.log(this.dato.cod_factua);
   
   }

   ngOnInit() {
    //console.log(history.state.cod_factura);
     this.getServicios();
     //onsole.log(this.cod_factura);
   }
 
  async guardar(){
    const controller = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'crescent'
    });

    await controller.present();
    this.service_factura.crearDetalleFactura(this.dato.cod_factua,this.servicioSeleccionado,this.precio,this.cantidad).subscribe( (res) => {
      controller.dismiss();
      console.log(res);
      this.router.navigate(['/nueva-factura']);

    },
    error=>{
       controller.dismiss();
      console.log(error.error.message);

    }
    
    );
  }

  async getServicios() {

    const controller = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'crescent'
    });

    await controller.present();
    this.service_factura.getServicios().subscribe( (res) => {
      controller.dismiss();
      this.servicios=res;
      console.log(res);
    },
    error=>{
       controller.dismiss();
      console.log(error.error.message);

    }
    
    );

  }
}
