import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {StorageService} from "../../core/services/storage.service";
import {StorageEnum} from "../../core/enums/storage.enum";
import {ButtonsTypeEnum} from "../../core/enums/buttonsType.enum";
import {ActionsService} from "../../core/services/actions.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit, OnChanges {

  public resultData: any;

  @Input() isShowResult!: boolean;

  constructor(
    private storageService: StorageService,
    private actionsService: ActionsService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this._getResults();
    this._watchActionButtonType();
  }

  private _watchActionButtonType(): void {
    this.actionsService.getStateActionButton()
      .subscribe((response: ButtonsTypeEnum) => {
        response === ButtonsTypeEnum.DECLINE && this._getResults();
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['isShowResult']) {
      this._getResults();
    }
  }

  private _getResults(): void {
    setTimeout(() => {
      this.resultData = this.storageService.getStorage(StorageEnum.RESULT);
      this.cdr.detectChanges();
    }, 100)
  }
}
