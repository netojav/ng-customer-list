import { Injectable } from "@angular/core";

function getLocalStorage(): Storage {
  return localStorage;
}

@Injectable()
export class LocalStorageRefService {
  get localStorage(): Storage {
    return getLocalStorage();
  }
}
