import {Injectable} from "@angular/core";
import {interval, Observable, scan, Subject, takeWhile, timer} from "rxjs";

@Injectable({providedIn: 'root'})
export class TimerService {

  protected _reverseTimer: number = 5;

  private _isDoneReverseTimer: Subject<boolean> = new Subject<boolean>();

  public getReverseTimer(): number {
    return this._reverseTimer;
  }

  public reverseTimer(): Observable<number> {
    return interval(1000).pipe(
      scan(ticks => --ticks, this.getReverseTimer()),
      takeWhile(v => v >= 0)
    );
  }

  public gameTimer(): Observable<number> {
    return timer(0, 1000).pipe(
      scan(acc => ++acc, 0)
    )
  }

  public setStateReverseTimer(state: boolean): void {
    this._isDoneReverseTimer.next(state);
  }

  public getStateReverseTimer(): Observable<boolean> {
    return this._isDoneReverseTimer;
  }
}
