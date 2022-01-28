import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureListComponent } from './pressure-list.component';

describe('PressureListComponent', () => {
  let component: PressureListComponent;
  let fixture: ComponentFixture<PressureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressureListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
