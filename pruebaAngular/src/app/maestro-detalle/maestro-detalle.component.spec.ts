import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroDetalleComponent } from './maestro-detalle.component';

describe('MaestroDetalleComponent', () => {
  let component: MaestroDetalleComponent;
  let fixture: ComponentFixture<MaestroDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
