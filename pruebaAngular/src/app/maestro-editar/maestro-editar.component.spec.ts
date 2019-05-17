import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroEditarComponent } from './maestro-editar.component';

describe('MaestroEditarComponent', () => {
  let component: MaestroEditarComponent;
  let fixture: ComponentFixture<MaestroEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
