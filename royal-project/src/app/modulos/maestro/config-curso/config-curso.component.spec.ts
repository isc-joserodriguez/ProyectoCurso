import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCursoComponent } from './config-curso.component';

describe('ConfigCursoComponent', () => {
  let component: ConfigCursoComponent;
  let fixture: ComponentFixture<ConfigCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
