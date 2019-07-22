import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroHomeComponent } from './maestro-home.component';

describe('MaestroHomeComponent', () => {
  let component: MaestroHomeComponent;
  let fixture: ComponentFixture<MaestroHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
