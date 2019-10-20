import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInscripcionComponent } from './admin-inscripcion.component';

describe('AdminInscripcionComponent', () => {
  let component: AdminInscripcionComponent;
  let fixture: ComponentFixture<AdminInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
