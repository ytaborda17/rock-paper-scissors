import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  async save (path: string, data: any): Promise<string> {
    return new Promise(async (resolve) => {
        const ref = await this.db.database.ref(path).push(data);
        resolve(ref.key || '');
    });
  }
}
