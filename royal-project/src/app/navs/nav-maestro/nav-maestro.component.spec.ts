import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMaestroComponent } from './nav-maestro.component';

describe('NavMaestroComponent', () => {
  let component: NavMaestroComponent;
  let fixture: ComponentFixture<NavMaestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMaestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
