import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarDetalleFacturaPageRoutingModule } from './agregar-detalle-factura-routing.module';

import { AgregarDetalleFacturaPage } from './agregar-detalle-factura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarDetalleFacturaPageRoutingModule
  ],
  declarations: [AgregarDetalleFacturaPage]
})
export class AgregarDetalleFacturaPageModule {}
