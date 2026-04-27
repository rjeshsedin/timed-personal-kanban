import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StorageService {
  private KEY = 'kanban-data';
  getData(): any {
    const raw = localStorage.getItem(this.KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed.projects) parsed.projects = [];
    return parsed;
  }
  setData(data: any) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }
}