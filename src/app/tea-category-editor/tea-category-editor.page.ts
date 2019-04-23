import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { TeaCategoriesService } from '../services/tea-categories/tea-categories.service';

@Component({
  selector: 'app-tea-category-editor',
  templateUrl: './tea-category-editor.page.html',
  styleUrls: ['./tea-category-editor.page.scss']
})
export class TeaCategoryEditorPage implements OnInit {
  name: string;
  description: string;

  constructor(
    private navController: NavController,
    private teaCategories: TeaCategoriesService
  ) {}

  ngOnInit() {}

  async save() {
    await this.teaCategories.add(this.name, this.description);
    this.navController.back();
  }
}
