import { Component } from '@angular/core';
import { DatabaseService } from '../services/database/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  databaseName: string;
  databasePath: string;

  constructor(private database: DatabaseService) {}

  async ionViewDidEnter() {
    await this.database.ready();
    this.databaseName = this.database.teaCatgories.getName();
    this.databasePath = await this.database.teaCatgories.getPath();
  }
}
