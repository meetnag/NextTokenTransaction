import { TestBed } from '@angular/core/testing';

import { TaTokenService } from './ta-token.service';

describe('TaTokenService', () => {
  let service: TaTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
