import { Injectable } from '@angular/core';

import {
  DataSource,
  Meta,
  MutableDocument,
  Ordering,
  QueryBuilder,
  SelectResult
} from 'ionic-enterprise-couchbase-lite';
import { TeaCategory } from '../../models/tea-category';
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

  async getAll(): Promise<Array<TeaCategory>> {
    await this.database.ready();
    const query = QueryBuilder.select(
      SelectResult.property('name'),
      SelectResult.property('description'),
      SelectResult.expression(Meta.id)
    )
      .from(DataSource.database(this.database.teaCatgories))
      .orderBy(Ordering.property('name'));
    const ret = await query.execute();
    const res = await ret.allResults();
    return res.map(t => ({
      id: t._id,
      name: t.name,
      description: t.description
    }));
  }
}
