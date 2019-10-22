import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoClaseInfoComponent } from './curso-clase-info.component';

describe('CursoClaseInfoComponent', () => {
  let component: CursoClaseInfoComponent;
  let fixture: ComponentFixture<CursoClaseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoClaseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoClaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
