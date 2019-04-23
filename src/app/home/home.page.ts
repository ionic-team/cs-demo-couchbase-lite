import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { DatabaseService } from '../services/database/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  databaseName: string;
  databasePath: string;

  constructor(
    private database: DatabaseService,
    private navController: NavController
  ) {}

  async ionViewDidEnter() {
    await this.database.ready();
    this.databaseName = this.database.teaCatgories.getName();
    this.databasePath = await this.database.teaCatgories.getPath();
  }

  addTeaCategory() {
    this.navController.navigateForward(['tea-category-editor']);
  }
}
