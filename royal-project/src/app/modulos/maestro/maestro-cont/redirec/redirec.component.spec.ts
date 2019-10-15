import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirecComponent } from './redirec.component';

describe('RedirecComponent', () => {
  let component: RedirecComponent;
  let fixture: ComponentFixture<RedirecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
