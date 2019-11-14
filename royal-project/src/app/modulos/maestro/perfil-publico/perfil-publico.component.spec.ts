import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPublicoComponent } from './perfil-publico.component';

describe('PerfilPublicoComponent', () => {
  let component: PerfilPublicoComponent;
  let fixture: ComponentFixture<PerfilPublicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPublicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
