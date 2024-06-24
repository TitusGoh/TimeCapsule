import { TestBed } from '@angular/core/testing';

import { CapsuleproxyService } from './capsuleproxy.service';

describe('TodoproxyService', () => {
  let service: CapsuleproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapsuleproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
