import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroCursoComponent } from './maestro-curso.component';

describe('MaestroCursoComponent', () => {
  let component: MaestroCursoComponent;
  let fixture: ComponentFixture<MaestroCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
