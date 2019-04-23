import { TestBed } from '@angular/core/testing';

import { DatabaseService } from '../database/database.service';
import { TeaCategoriesService } from './tea-categories.service';

describe('TeaCategoriesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: DatabaseService, useValue: {} }]
    })
  );

  it('should be created', () => {
    const service: TeaCategoriesService = TestBed.get(TeaCategoriesService);
    expect(service).toBeTruthy();
  });
});
