import { TestBed } from '@angular/core/testing';

import { TopLoaderService } from './top-loader.service';

describe('TopLoaderService', () => {
  let service: TopLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
