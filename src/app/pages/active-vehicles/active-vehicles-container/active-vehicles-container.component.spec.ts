import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveVehiclesContainerComponent } from './active-vehicles-container.component';

describe('ActiveVehiclesContainerComponent', () => {
  let component: ActiveVehiclesContainerComponent;
  let fixture: ComponentFixture<ActiveVehiclesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveVehiclesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveVehiclesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
