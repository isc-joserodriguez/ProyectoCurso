import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdministradorComponent } from './nav-administrador.component';

describe('NavAdministradorComponent', () => {
  let component: NavAdministradorComponent;
  let fixture: ComponentFixture<NavAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
