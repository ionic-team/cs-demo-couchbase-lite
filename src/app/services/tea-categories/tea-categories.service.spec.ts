import { TestBed } from '@angular/core/testing';

import { TeaCategoriesService } from './tea-categories.service';

describe('TeaCategoriesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({})
  );

  it('should be created', () => {
    const service: TeaCategoriesService = TestBed.get(TeaCategoriesService);
    expect(service).toBeTruthy();
  });
});
