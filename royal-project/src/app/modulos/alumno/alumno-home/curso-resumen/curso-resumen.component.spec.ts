import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoResumenComponent } from './curso-resumen.component';

describe('CursoResumenComponent', () => {
  let component: CursoResumenComponent;
  let fixture: ComponentFixture<CursoResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
