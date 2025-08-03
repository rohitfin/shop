import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: {}): void{
    localStorage.setItem("userData", JSON.stringify(value));
  }

  getItem(key: string){
    let item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void{
    localStorage.removeItem(key);
  }

  clear(): void{
    localStorage.clear();
  }


}
