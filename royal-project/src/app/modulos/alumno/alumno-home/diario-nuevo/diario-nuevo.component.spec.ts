import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioNuevoComponent } from './diario-nuevo.component';

describe('DiarioNuevoComponent', () => {
  let component: DiarioNuevoComponent;
  let fixture: ComponentFixture<DiarioNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarioNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
