import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

import { TeaCategory } from '../models/tea-category';
import { TeaCategoriesService } from '../services/tea-categories/tea-categories.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  databaseName: string;
  databasePath: string;
  categories: Array<TeaCategory>;

  constructor(
    private alertController: AlertController,
    private teaCategories: TeaCategoriesService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.fetchCategories();
    this.teaCategories.onChange(() => this.fetchCategories());
  }

  addTeaCategory() {
    this.navController.navigateForward(['tea-category-editor']);
  }

  editTeaCategory(id: string) {
    this.navController.navigateForward(['tea-category-editor', id]);
  }

  async removeTeaCategory(id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to permanently remove this category?',
      buttons: [
        { text: 'Yes', handler: () => this.teaCategories.delete(id) },
        { text: 'No', role: 'cancel' }
      ]
    });
    alert.present();
  }

  private async fetchCategories(): Promise<void> {
    this.categories = await this.teaCategories.getAll();
  }
}
