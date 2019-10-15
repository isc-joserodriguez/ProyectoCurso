import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTemarioComponent } from './config-temario.component';

describe('ConfigTemarioComponent', () => {
  let component: ConfigTemarioComponent;
  let fixture: ComponentFixture<ConfigTemarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigTemarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTemarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
