import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoRevisionComponent } from './curso-revision.component';

describe('CursoRevisionComponent', () => {
  let component: CursoRevisionComponent;
  let fixture: ComponentFixture<CursoRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
