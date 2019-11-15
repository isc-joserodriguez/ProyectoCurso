import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioPropiasComponent } from './diario-propias.component';

describe('DiarioPropiasComponent', () => {
  let component: DiarioPropiasComponent;
  let fixture: ComponentFixture<DiarioPropiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarioPropiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioPropiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
