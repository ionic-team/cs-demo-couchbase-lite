import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeaCategoryEditorPage } from './tea-category-editor.page';

const routes: Routes = [
  {
    path: '',
    component: TeaCategoryEditorPage
  },
  {
    path: ':id',
    component: TeaCategoryEditorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeaCategoryEditorPage]
})
export class TeaCategoryEditorPageModule {}
