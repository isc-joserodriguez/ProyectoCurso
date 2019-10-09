import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSubtemaComponent } from './config-subtema.component';

describe('ConfigSubtemaComponent', () => {
  let component: ConfigSubtemaComponent;
  let fixture: ComponentFixture<ConfigSubtemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigSubtemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigSubtemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
