import { TestBed, inject } from '@angular/core/testing';

import { ApiBackendService } from './api-backend.service';

describe('ApiBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiBackendService]
    });
  });

  it('should be created', inject([ApiBackendService], (service: ApiBackendService) => {
    expect(service).toBeTruthy();
  }));
});
