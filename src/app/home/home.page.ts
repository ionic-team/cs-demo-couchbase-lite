import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { DatabaseService } from '../services/database/database.service';
import { TeaCategory } from '../models/tea-category';
import { TeaCategoriesService } from '../services/tea-categories/tea-categories.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  databaseName: string;
  databasePath: string;
  categories: Array<TeaCategory>;

  constructor(
    private database: DatabaseService,
    private teaCategories: TeaCategoriesService,
    private navController: NavController
  ) {}

  async ionViewDidEnter() {
    this.categories = await this.teaCategories.getAll();
    await this.database.ready();
    this.databaseName = this.database.teaCatgories.getName();
    this.databasePath = await this.database.teaCatgories.getPath();
  }

  addTeaCategory() {
    this.navController.navigateForward(['tea-category-editor']);
  }
}
