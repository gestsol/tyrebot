import { TestBed } from '@angular/core/testing';

import { ActiveVehiclesService } from './active-vehicles.service';

describe('ActiveVehiclesService', () => {
  let service: ActiveVehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveVehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
