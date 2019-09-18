import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoConfigComponent } from './curso-config.component';

describe('CursoConfigComponent', () => {
  let component: CursoConfigComponent;
  let fixture: ComponentFixture<CursoConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
