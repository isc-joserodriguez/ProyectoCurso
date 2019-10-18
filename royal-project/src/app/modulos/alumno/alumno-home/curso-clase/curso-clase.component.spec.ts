import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoClaseComponent } from './curso-clase.component';

describe('CursoClaseComponent', () => {
  let component: CursoClaseComponent;
  let fixture: ComponentFixture<CursoClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
