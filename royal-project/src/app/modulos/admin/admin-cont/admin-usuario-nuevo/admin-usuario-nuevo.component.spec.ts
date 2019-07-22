import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuarioNuevoComponent } from './admin-usuario-nuevo.component';

describe('AdminUsuarioNuevoComponent', () => {
  let component: AdminUsuarioNuevoComponent;
  let fixture: ComponentFixture<AdminUsuarioNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsuarioNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsuarioNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
