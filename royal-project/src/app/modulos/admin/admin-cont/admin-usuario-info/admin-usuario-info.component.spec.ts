import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuarioInfoComponent } from './admin-usuario-info.component';

describe('AdminUsuarioInfoComponent', () => {
  let component: AdminUsuarioInfoComponent;
  let fixture: ComponentFixture<AdminUsuarioInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsuarioInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsuarioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
