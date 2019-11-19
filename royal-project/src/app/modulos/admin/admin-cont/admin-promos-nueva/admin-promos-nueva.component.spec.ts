import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromosNuevaComponent } from './admin-promos-nueva.component';

describe('AdminPromosNuevaComponent', () => {
  let component: AdminPromosNuevaComponent;
  let fixture: ComponentFixture<AdminPromosNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPromosNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromosNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
