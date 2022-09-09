import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ButtonsTypeEnum} from "../enums/buttonsType.enum";

@Injectable({providedIn: 'root'})
export class ActionsService {

  private _stateActionButton$: Subject<ButtonsTypeEnum> = new Subject<ButtonsTypeEnum>();

  constructor() {
  }

  public getStateActionButton(): Observable<ButtonsTypeEnum> {
    return this._stateActionButton$;
  }

  public setStateActionButton(buttonType: ButtonsTypeEnum): void {
    this._stateActionButton$.next(buttonType);
  }
}
