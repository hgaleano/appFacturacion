import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarDetalleFacturaPage } from './agregar-detalle-factura.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDetalleFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDetalleFacturaPageRoutingModule {}
