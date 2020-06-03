import { TestBed } from '@angular/core/testing';

import { UserSpeedingService } from './user-speeding.service';

describe('UserSpeedingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSpeedingService = TestBed.get(UserSpeedingService);
    expect(service).toBeTruthy();
  });
});
