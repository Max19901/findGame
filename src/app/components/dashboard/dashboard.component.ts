import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {DashboardService} from "../../core/services/dashboard.service";
import {IMappingDashboardData} from "../../core/interfaces/dasboard.interface";
import {fade, rotatedState} from "../../../animations/animations";
import {ActionsService} from "../../core/services/actions.service";
import {ButtonsTypeEnum} from "../../core/enums/buttonsType.enum";
import {TimerService} from "../../core/services/timer.service";
import {Subscription} from "rxjs";
import {AppEnum, SoundEnum} from "../../core/enums/app.enum";
import {SoundService} from "../../core/services/sound.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [rotatedState, fade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  public cards: IMappingDashboardData[] = [];

  private _selectFirstCard: IMappingDashboardData = {} as IMappingDashboardData;
  private _selectSecondCard: IMappingDashboardData = {} as IMappingDashboardData;

  @Input() gameStatus!: AppEnum;

  @Output() onHandleCardItem: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() gameStatusChange: EventEmitter<AppEnum> = new EventEmitter<AppEnum>();

  constructor(
    private dashboardService: DashboardService,
    private actionsService: ActionsService,
    private timerService: TimerService,
    private sound: SoundService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this._getDashboardData();
    this._getActionsState();
  }

  private _getDashboardData(): void {
    this.dashboardService.getCardsData()
      .subscribe((response: IMappingDashboardData[]) => {
        this.cards = this.dashboardService.shuffleData(response);
        this.cdr.detectChanges();
      });
  }

  public onHandleCard(item: IMappingDashboardData): void {
    this.onHandleCardItem.emit(false);
    if (!item.rotate && this.gameStatus === AppEnum.GAME_START) {
      if (!this._selectFirstCard.id) {
        this._selectFirstCard = item;
        item.rotate = !item.rotate;
        this.cdr.detectChanges();
        return;
      }

      if (!this._selectSecondCard.id) {
        this._selectSecondCard = item;
        item.rotate = !item.rotate;
        setTimeout(() => this._matchingCardToData(this.isCardsMatched()), 500);
      }
    }
  }

  private isCardsMatched(): boolean {
    this.dashboardService.isSelectedCardMatched(this._selectFirstCard, this._selectSecondCard) ?
      this.sound._loadSound(SoundEnum.MATCH) : this.sound._loadSound(SoundEnum.FAIL);
    return this.dashboardService.isSelectedCardMatched(this._selectFirstCard, this._selectSecondCard)
  }

  private _matchingCardToData(isRotate: boolean): void {
    this.cards = this.cards.map((card: IMappingDashboardData) => {
      if (card.id === this._selectFirstCard.id || card.id === this._selectSecondCard.id) {
        card.rotate = isRotate;
        return card;
      }
      return card;
    });
    this._selectFirstCard = this._selectSecondCard = {} as IMappingDashboardData;
    this._checkIsAllCardsFind();
    this.cdr.detectChanges();
  }

  private _checkIsAllCardsFind(): void {
    const rotatedCards: boolean = this.cards.filter((card: IMappingDashboardData) => card.rotate).length === this.cards.length;
    rotatedCards && this.gameStatusChange.emit(AppEnum.GAME_END);
  }

  private _getActionsState(): void {
    this.actionsService.getStateActionButton()
      .subscribe((state: ButtonsTypeEnum) => {
        state === ButtonsTypeEnum.ACCEPT ? this._showDashboardCards() : this._resetDashboardCards();
      });
  }

  private _showDashboardCards(): void {
    this._getDoneReverseTime();
    let index: number = 0;
    const interval: number = setInterval(() => {
      if (index < this.cards.length) {
        this.cards[index].rotate = true;
        index++;
        this.cdr.detectChanges();
      } else {
        clearInterval(interval);
      }
    }, 50)
  }

  private _resetDashboardCards(): void {
    this.cards = [];
    this._getDashboardData();
  }

  private _getDoneReverseTime(): void {
    const stateSubscription$: Subscription = this.timerService.getStateReverseTimer().subscribe((state: boolean) => {
      state && this.cards.forEach((card: IMappingDashboardData) => card.rotate = false);
      stateSubscription$.unsubscribe();
      this.cdr.detectChanges();
    })
  }
}
