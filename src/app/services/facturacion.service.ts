import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ClienteResponse } from '../interfaces/clienteResponse';
import { ServicioResponse } from '../interfaces/servicioResponse';
import { DetalleFacturaResponse } from '../interfaces/detalleFacturaResponse';
@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(public http: HttpClient) { }

  getClientes() {
    return this.http.get<ClienteResponse[]>('http://localhost/apiFacturacion/public/cliente');
  }
  
  getServicios() {
    return this.http.get<ServicioResponse[]>('http://localhost/apiFacturacion/public/servicio');
  }

  getDetalleFactura(id:any) {
    return this.http.get<DetalleFacturaResponse[]>('http://localhost/apiFacturacion/public/detalle-factura/'+id);
  }

  crearFactura(fecha:any, cod_cliente:any) {
    const formData = new FormData();
    console.log(fecha);
    console.log(cod_cliente);
    
    
    formData.append('fecha', fecha);
    formData.append('cod_cliente', cod_cliente);
    return this.http.post<any>('http://localhost/apiFacturacion/public/factura', formData);
  }

  crearDetalleFactura(cod_factura:any, cod_servicio:any,precio:any,cantidad:any) {

    console.log(cod_factura);
    console.log(cod_servicio);
    console.log(precio);
    console.log(cantidad);
    const formData = new FormData();
    formData.append('cod_factura', cod_factura);
    formData.append('cod_servicio', cod_servicio);
    formData.append('precio', precio);
    formData.append('cantidad', cantidad);
    return this.http.post<any>('http://localhost/apiFacturacion/public/detalle-factura', formData);
  }

}
