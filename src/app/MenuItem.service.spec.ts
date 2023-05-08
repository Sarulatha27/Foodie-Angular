/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuItemService } from './MenuItem.service';

describe('Service: MenuItem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuItemService]
    });
  });

  it('should ...', inject([MenuItemService], (service: MenuItemService) => {
    expect(service).toBeTruthy();
  }));
});
