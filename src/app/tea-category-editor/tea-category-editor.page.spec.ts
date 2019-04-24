import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { createNavControllerMock, createActivatedRouteMock } from '../../../test/mocks';
import { TeaCategoryEditorPage } from './tea-category-editor.page';
import { ActivatedRoute } from '@angular/router';

describe('TeaCategoryEditorPage', () => {
  let component: TeaCategoryEditorPage;
  let fixture: ComponentFixture<TeaCategoryEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeaCategoryEditorPage],
      imports: [IonicModule, FormsModule],
      providers: [
        { provide: ActivatedRoute, useFactory: createActivatedRouteMock },
        { provide: Location, useValue: {} },
        { provide: NavController, useFactory: createNavControllerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaCategoryEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
