import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCreationSuccessComponent } from './vehicle-creation-success.component';

describe('VehicleCreationSuccessComponent', () => {
  let component: VehicleCreationSuccessComponent;
  let fixture: ComponentFixture<VehicleCreationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCreationSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCreationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
