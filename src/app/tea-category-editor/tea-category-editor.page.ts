import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { TeaCategoriesService } from '../services/tea-categories/tea-categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tea-category-editor',
  templateUrl: './tea-category-editor.page.html',
  styleUrls: ['./tea-category-editor.page.scss']
})
export class TeaCategoryEditorPage implements OnInit {
  private id: string;

  name: string;
  description: string;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private teaCategories: TeaCategoriesService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Edit Tea Category';
      const category = await this.teaCategories.get(id);
      this.id = category.id;
      this.name = category.name;
      this.description = category.description;
    } else {
      this.title = 'Add New Tea Category';
    }
  }

  async save() {
    await this.teaCategories.save({
      id: this.id,
      name: this.name,
      description: this.description
    });
    this.navController.back();
  }
}
