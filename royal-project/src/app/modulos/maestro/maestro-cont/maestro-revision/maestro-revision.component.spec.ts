import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroRevisionComponent } from './maestro-revision.component';

describe('MaestroRevisionComponent', () => {
  let component: MaestroRevisionComponent;
  let fixture: ComponentFixture<MaestroRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
