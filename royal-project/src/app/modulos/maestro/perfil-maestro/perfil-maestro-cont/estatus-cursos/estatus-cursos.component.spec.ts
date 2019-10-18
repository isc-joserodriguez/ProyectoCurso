import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatusCursosComponent } from './estatus-cursos.component';

describe('EstatusCursosComponent', () => {
  let component: EstatusCursosComponent;
  let fixture: ComponentFixture<EstatusCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatusCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatusCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
