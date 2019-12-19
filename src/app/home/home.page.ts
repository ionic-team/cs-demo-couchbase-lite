import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

import { TeaCategory } from '../models/tea-category';
import { TeaCategoriesService } from '../services/tea-categories/tea-categories.service';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  databaseName: string;
  databasePath: string;
  categories$: Observable<Array<TeaCategory>>;

  constructor(
    private alertController: AlertController,
    private teaCategories: TeaCategoriesService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.categories$ = this.teaCategories.changed.pipe(flatMap(() => from(this.teaCategories.getAll())));
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
      buttons: [{ text: 'Yes' }, { text: 'No', role: 'cancel' }]
    });
    alert.present();
    const res = await alert.onDidDismiss();
    if (res.role !== 'cancel') {
      await this.teaCategories.delete(id);
    }
  }
}
