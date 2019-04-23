import { Injectable } from '@angular/core';

import { MutableDocument } from 'ionic-enterprise-couchbase-lite';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class TeaCategoriesService {
  constructor(private database: DatabaseService) {}

  async add(name: string, description: string): Promise<void> {
    await this.database.ready();

    const doc = new MutableDocument()
      .setString('name', name)
      .setString('description', description);
    return this.database.teaCatgories.save(doc);
  }
}
