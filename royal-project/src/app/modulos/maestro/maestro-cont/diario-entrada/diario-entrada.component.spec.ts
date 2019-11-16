import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioEntradaComponent } from './diario-entrada.component';

describe('DiarioEntradaComponent', () => {
  let component: DiarioEntradaComponent;
  let fixture: ComponentFixture<DiarioEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarioEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
