import { Injectable } from '@angular/core';

import { Database, DatabaseConfiguration, IonicCBL, CordovaEngine } from 'ionic-enterprise-couchbase-lite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readyPromise: Promise<void>;

  teaCatgories: Database;

  constructor() {
    this.readyPromise = this.initializeDatabases();
  }

  private async initializeDatabases(): Promise<void> {
    return new Promise((resolve) => {
      IonicCBL.onReady(async () => {
        const config = new DatabaseConfiguration();
        config.setEncryptionKey('8e31f8f6-60bd-482a-9c70-69855dd02c38');
        this.teaCatgories = new Database('teacatgories', config);
        this.teaCatgories.setEngine(new CordovaEngine({
          allResultsChunkSize: 9999 
        }));
        await this.teaCatgories.open();
        resolve();
      });
    });
  }

  async ready(): Promise<void> {
    return this.readyPromise;
  }
}
