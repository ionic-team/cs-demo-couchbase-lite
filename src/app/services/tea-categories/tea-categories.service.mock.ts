import { BehaviorSubject } from 'rxjs';

export function createTeaCategoriesServiceMock() {
  const mock = jasmine.createSpyObj('TeaCategoriesService', {
    getAll: Promise.resolve([]),
    get: Promise.resolve(),
    save: Promise.resolve(),
    delete: Promise.resolve()
  });
  mock.changed = new BehaviorSubject(undefined);
  return mock;
}
