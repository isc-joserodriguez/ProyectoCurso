import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigClaseComponent } from './config-clase.component';

describe('ConfigClaseComponent', () => {
  let component: ConfigClaseComponent;
  let fixture: ComponentFixture<ConfigClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
