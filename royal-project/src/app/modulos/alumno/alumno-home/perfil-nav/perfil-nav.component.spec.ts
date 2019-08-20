import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilNavComponent } from './perfil-nav.component';

describe('PerfilNavComponent', () => {
  let component: PerfilNavComponent;
  let fixture: ComponentFixture<PerfilNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
