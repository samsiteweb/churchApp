import { TestBed } from '@angular/core/testing';

import { MemberActionsService } from './member-actions.service';

describe('MemberActionsService', () => {
  let service: MemberActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
