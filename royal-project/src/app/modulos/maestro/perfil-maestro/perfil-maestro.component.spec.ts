import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMaestroComponent } from './perfil-maestro.component';

describe('PerfilMaestroComponent', () => {
  let component: PerfilMaestroComponent;
  let fixture: ComponentFixture<PerfilMaestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilMaestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
