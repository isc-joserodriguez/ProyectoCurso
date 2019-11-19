import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromosEditComponent } from './admin-promos-edit.component';

describe('AdminPromosEditComponent', () => {
  let component: AdminPromosEditComponent;
  let fixture: ComponentFixture<AdminPromosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPromosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
