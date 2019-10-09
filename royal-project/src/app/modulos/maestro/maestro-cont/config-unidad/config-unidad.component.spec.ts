import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUnidadComponent } from './config-unidad.component';

describe('ConfigUnidadComponent', () => {
  let component: ConfigUnidadComponent;
  let fixture: ComponentFixture<ConfigUnidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigUnidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
