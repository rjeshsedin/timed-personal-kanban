import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StorageService {
  private KEY = 'kanban-data';
  getData(): any {
    return JSON.parse(localStorage.getItem(this.KEY) || '{}');
  }
  setData(data: any) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }
}