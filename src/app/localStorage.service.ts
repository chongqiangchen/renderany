import {Injectable} from '@angular/core';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class LocalStorageService {

  constructor() {
  }

  set(key, value) {
    localStorage.setItem(key, value);
  }

  get(key) {
    return localStorage.getItem(key);
  }
}
