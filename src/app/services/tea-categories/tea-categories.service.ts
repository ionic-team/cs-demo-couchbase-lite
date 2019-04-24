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

  async get(id: string): Promise<TeaCategory> {
    await this.database.ready();
    const d = await this.database.teaCatgories.getDocument(id);
    const dict = d.toDictionary();
    return {
      id: d.getId(),
      name: dict.name,
      description: dict.description
    };
  }

  async save(category: TeaCategory): Promise<void> {
    return category.id ? this.update(category) : this.add(category);
  }

  private async add(category: TeaCategory): Promise<void> {
    await this.database.ready();
    const doc = new MutableDocument()
      .setString('name', category.name)
      .setString('description', category.description);
    return this.database.teaCatgories.save(doc);
  }

  private async update(category: TeaCategory): Promise<void> {
    await this.database.ready();
    const d = await this.database.teaCatgories.getDocument(category.id);
    const md = new MutableDocument(d.getId(), d.getSequence(), d.getData());
    md.setString('name', category.name);
    md.setString('description', category.description);
    return this.database.teaCatgories.save(md);
  }
}
