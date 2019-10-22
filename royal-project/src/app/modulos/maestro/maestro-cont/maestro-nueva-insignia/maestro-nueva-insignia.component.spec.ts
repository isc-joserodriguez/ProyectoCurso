import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroNuevaInsigniaComponent } from './maestro-nueva-insignia.component';

describe('MaestroNuevaInsigniaComponent', () => {
  let component: MaestroNuevaInsigniaComponent;
  let fixture: ComponentFixture<MaestroNuevaInsigniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroNuevaInsigniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroNuevaInsigniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
