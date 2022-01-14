import { TestBed } from '@angular/core/testing';

import { VehiclesFlowService } from './vehicles-flow.service';

describe('VehiclesFlowService', () => {
  let service: VehiclesFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
