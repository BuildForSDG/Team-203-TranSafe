import { TestBed, async, inject } from '@angular/core/testing';

import { HomesignedinGuard } from './homesignedin.guard';

describe('HomesignedinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomesignedinGuard]
    });
  });

  it('should ...', inject([HomesignedinGuard], (guard: HomesignedinGuard) => {
    expect(guard).toBeTruthy();
  }));
});
