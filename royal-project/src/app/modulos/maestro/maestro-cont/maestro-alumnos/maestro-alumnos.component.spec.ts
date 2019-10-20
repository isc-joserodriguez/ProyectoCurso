import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroAlumnosComponent } from './maestro-alumnos.component';

describe('MaestroAlumnosComponent', () => {
  let component: MaestroAlumnosComponent;
  let fixture: ComponentFixture<MaestroAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
