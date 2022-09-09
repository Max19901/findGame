import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ActionsService} from "../../core/services/actions.service";
import {ButtonsTypeEnum} from "../../core/enums/buttonsType.enum";
import {TimerService} from "../../core/services/timer.service";
import {Subscription} from "rxjs";
import {StorageService} from "../../core/services/storage.service";
import {StorageEnum} from "../../core/enums/storage.enum";
import {AppEnum, SoundEnum} from "../../core/enums/app.enum";
import {SoundService} from "../../core/services/sound.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  public timer: number = 5;
  private gameTimerSubscription$!: Subscription;
  private reverseTimerSubscription$!: Subscription;

  @Input() gameStatus!: AppEnum;
  @Output() gameStatusChange: EventEmitter<AppEnum> = new EventEmitter<AppEnum>();

  constructor(
    private actionsService: ActionsService,
    private timerService: TimerService,
    private storageService: StorageService,
    private sound: SoundService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this._watchActionButtonType();
  }

  private _watchActionButtonType(): void {
    this.actionsService.getStateActionButton()
      .subscribe((response: ButtonsTypeEnum) => {
        response === ButtonsTypeEnum.ACCEPT ? this._startReserveTimer() : this._stopGame();
      })
  }

  private _startReserveTimer(): void {
    this.gameStatusChange.emit(AppEnum.GAME_START);
    this.reverseTimerSubscription$ = this.timerService.reverseTimer()
      .subscribe((response: number) => {
        this.timer = response;
        this.cdr.detectChanges();
        if (!response) {
          this.reverseTimerSubscription$.unsubscribe();
          this.timerService.setStateReverseTimer(true);
          setTimeout(() => this._startGameTimer(), 1000)
        }
      });
  }

  private _startGameTimer(): void {
    this.gameTimerSubscription$ = this.timerService.gameTimer()
      .subscribe((response: number) => {
        if (this.gameStatus === AppEnum.GAME_START) {
          this.timer = response;
          this.cdr.detectChanges();
          return;
        }
        this._setResultTime();
      });
  }

  private _setResultTime(): void {
    const resultData: number[] = this.storageService.getStorage(StorageEnum.RESULT) || [];
    resultData.push(this.timer);
    this.storageService.setStorage(StorageEnum.RESULT, resultData);
    this.sound._loadSound(SoundEnum.WIN);
    this._stopGame();
  }

  private _stopGame(): void {
    this.gameTimerSubscription$ && this.gameTimerSubscription$.unsubscribe();
    this.reverseTimerSubscription$ && this.reverseTimerSubscription$.unsubscribe();
    this.timer = this.timerService.getReverseTimer();
    this.gameStatusChange.emit(AppEnum.GAME_END);
    this.cdr.detectChanges();
  }

}
