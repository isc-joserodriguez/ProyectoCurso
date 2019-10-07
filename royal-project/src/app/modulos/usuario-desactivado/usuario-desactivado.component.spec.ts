import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDesactivadoComponent } from './usuario-desactivado.component';

describe('UsuarioDesactivadoComponent', () => {
  let component: UsuarioDesactivadoComponent;
  let fixture: ComponentFixture<UsuarioDesactivadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioDesactivadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDesactivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
