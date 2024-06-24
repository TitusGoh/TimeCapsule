import { TestBed } from '@angular/core/testing';

import { LockingSharedService } from './locking-shared.service';

describe('LockingSharedService', () => {
  let service: LockingSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockingSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
