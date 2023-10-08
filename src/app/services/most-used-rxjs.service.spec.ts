import { TestBed } from '@angular/core/testing';

import { MostUsedRxjsService } from './most-used-rxjs.service';

describe('MostUsedRxjsService', () => {
  let service: MostUsedRxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostUsedRxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
