import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

import { HomePage } from './home.page';
import { TeaCategoriesService } from '@app/services/tea-categories/tea-categories.service';
import { createTeaCategoriesServiceMock } from '@app/services/tea-categories/tea-categories.service.mock';
import { createNavControllerMock } from '@test/mocks';
import { TeaCategory } from '@app/models/tea-category';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NavController, useFactory: createNavControllerMock },
        { provide: TeaCategoriesService, useFactory: createTeaCategoriesServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets teas as changes are made', fakeAsync(() => {
    let categories: Array<TeaCategory>;
    component.categories$.subscribe(c => (categories = c));
    tick();
    expect(categories).toEqual([]);
  }));
});
