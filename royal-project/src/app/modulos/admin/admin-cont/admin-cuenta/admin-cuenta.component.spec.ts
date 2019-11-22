import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCuentaComponent } from './admin-cuenta.component';

describe('AdminCuentaComponent', () => {
  let component: AdminCuentaComponent;
  let fixture: ComponentFixture<AdminCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
