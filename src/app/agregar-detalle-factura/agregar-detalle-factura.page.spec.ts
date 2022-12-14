import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarDetalleFacturaPage } from './agregar-detalle-factura.page';

describe('AgregarDetalleFacturaPage', () => {
  let component: AgregarDetalleFacturaPage;
  let fixture: ComponentFixture<AgregarDetalleFacturaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDetalleFacturaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDetalleFacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
