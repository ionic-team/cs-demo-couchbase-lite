import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import {
  CordovaEngine,
  Database,
  DatabaseConfiguration,
  DataSource,
  IonicCBL,
  Meta,
  MutableDocument,
  Ordering,
  QueryBuilder,
  SelectResult
} from '@ionic-enterprise/offline-storage';
import { TeaCategory } from '../../models/tea-category';

@Injectable({
  providedIn: 'root'
})
export class TeaCategoriesService {
  private database: Database;
  private readyPromise: Promise<void>;
  private changedSubject: BehaviorSubject<void>;

  get changed(): Observable<void> {
    return this.changedSubject.asObservable();
  }

  constructor() {
    this.changedSubject = new BehaviorSubject(null);
    this.readyPromise = this.initializeDatabase();
  }

  async getAll(): Promise<Array<TeaCategory>> {
    await this.readyPromise;
    const query = QueryBuilder.select(
      SelectResult.property('name'),
      SelectResult.property('description'),
      SelectResult.expression(Meta.id)
    )
      .from(DataSource.database(this.database))
      .orderBy(Ordering.property('name'));
    const ret = await query.execute();
    const res = await ret.allResults();
    return res.map(t => {
      return {
        id: t.id,
        name: t.name,
        description: t.description
      };
    });
  }

  async get(id: string): Promise<TeaCategory> {
    await this.readyPromise;
    const d = await this.database.getDocument(id);
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

  async delete(id: string): Promise<void> {
    await this.readyPromise;
    const d = await this.database.getDocument(id);
    return this.database.deleteDocument(d);
  }

  onChange(cb: () => void) {
    this.readyPromise.then(() => this.database.addChangeListener(cb));
  }

  private async add(category: TeaCategory): Promise<void> {
    await this.readyPromise;
    const doc = new MutableDocument().setString('name', category.name).setString('description', category.description);
    return this.database.save(doc);
  }

  private async update(category: TeaCategory): Promise<void> {
    await this.readyPromise;
    const d = await this.database.getDocument(category.id);
    const md = new MutableDocument(d.getId(), d.getSequence(), d.getData());
    md.setString('name', category.name);
    md.setString('description', category.description);
    return this.database.save(md);
  }

  private async initializeDatabase(): Promise<void> {
    return new Promise(resolve => {
      IonicCBL.onReady(async () => {
        const config = new DatabaseConfiguration();
        config.setEncryptionKey('8e31f8f6-60bd-482a-9c70-69855dd02c38');
        this.database = new Database('teacatgories', config);
        this.database.setEngine(
          new CordovaEngine({
            allResultsChunkSize: 9999
          })
        );
        await this.database.open();
        this.database.addChangeListener(() => this.changedSubject.next());
        resolve();
      });
    });
  }
}
