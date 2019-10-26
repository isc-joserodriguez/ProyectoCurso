import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroInsigniaEditarComponent } from './maestro-insignia-editar.component';

describe('MaestroInsigniaEditarComponent', () => {
  let component: MaestroInsigniaEditarComponent;
  let fixture: ComponentFixture<MaestroInsigniaEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroInsigniaEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroInsigniaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
