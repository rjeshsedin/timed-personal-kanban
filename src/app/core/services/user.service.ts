import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private storage: StorageService) {}

  getName(): string | null {
    const data = this.storage.getData();
    return typeof data?.userName === 'string' && data.userName.trim()
      ? data.userName.trim()
      : null;
  }

  setName(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const data = this.storage.getData();
    data.userName = trimmed;
    this.storage.setData(data);
  }
}

