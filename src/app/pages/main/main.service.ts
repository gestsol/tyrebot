import { Injectable } from '@angular/core';

export enum AjaxDialogResult {
  success = 1,
  error = 2,
  close = 3
}

export enum AjaxDialogAction {
  view = 1,
  update = 2,
  create = 3
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }
}
