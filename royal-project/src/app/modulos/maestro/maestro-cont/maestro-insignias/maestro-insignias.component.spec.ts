import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroInsigniasComponent } from './maestro-insignias.component';

describe('MaestroInsigniasComponent', () => {
  let component: MaestroInsigniasComponent;
  let fixture: ComponentFixture<MaestroInsigniasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroInsigniasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroInsigniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
