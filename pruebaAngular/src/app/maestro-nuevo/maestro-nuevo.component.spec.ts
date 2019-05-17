import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroNuevoComponent } from './maestro-nuevo.component';

describe('MaestroNuevoComponent', () => {
  let component: MaestroNuevoComponent;
  let fixture: ComponentFixture<MaestroNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
