import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ButtonsTypeEnum} from "../../core/enums/buttonsType.enum";
import {ActionsService} from "../../core/services/actions.service";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent {
  public buttonsType: typeof ButtonsTypeEnum = ButtonsTypeEnum;
  public isHandleStartGame: boolean = false;

  constructor(
    private actionsService: ActionsService,
    private cdr: ChangeDetectorRef) {
  }

  public actionHandler(type: ButtonsTypeEnum): void {
    this.isHandleStartGame = type === ButtonsTypeEnum.ACCEPT;
    this.actionsService.setStateActionButton(type);
    this.cdr.detectChanges();
  }
}
