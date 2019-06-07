import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCoordinadorComponent } from './nav-coordinador.component';

describe('NavCoordinadorComponent', () => {
  let component: NavCoordinadorComponent;
  let fixture: ComponentFixture<NavCoordinadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavCoordinadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCoordinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
