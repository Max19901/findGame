import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class StorageService {

  public setStorage(name: string, data: any): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  public getStorage(name: string): any {
    const value: any = localStorage.getItem(name);
    return JSON.parse(value);
  }
}
