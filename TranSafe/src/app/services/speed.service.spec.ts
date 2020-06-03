import { TestBed } from '@angular/core/testing';

import { SpeedService } from './speed.service';

describe('SpeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeedService = TestBed.get(SpeedService);
    expect(service).toBeTruthy();
  });
});
