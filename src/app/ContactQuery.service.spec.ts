/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactQueryService } from './ContactQuery.service';

describe('Service: ContactQuery', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactQueryService]
    });
  });

  it('should ...', inject([ContactQueryService], (service: ContactQueryService) => {
    expect(service).toBeTruthy();
  }));
});
