import { TestBed } from '@angular/core/testing';

import { WatchesService } from './watches.service';

describe('WatchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WatchesService = TestBed.get(WatchesService);
    expect(service).toBeTruthy();
  });
});
