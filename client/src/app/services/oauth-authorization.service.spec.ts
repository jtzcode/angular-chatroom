import { TestBed } from '@angular/core/testing';

import { OauthAuthorizationService } from './oauth-authorization.service';

describe('OauthAuthorizationService', () => {
  let service: OauthAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OauthAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
