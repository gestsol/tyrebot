import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsymmetryPressureComponent } from './asymmetry-pressure.component';

describe('AsymmetryPressureComponent', () => {
  let component: AsymmetryPressureComponent;
  let fixture: ComponentFixture<AsymmetryPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsymmetryPressureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsymmetryPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
