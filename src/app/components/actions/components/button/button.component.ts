import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonsTypeEnum} from "../../../../core/enums/buttonsType.enum";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() textButton: string = 'Default';
  @Input() isDisabled!: boolean;
  @Input() typeButton: ButtonsTypeEnum = ButtonsTypeEnum.ACCEPT;

  @Output() clickHandler: EventEmitter<ButtonsTypeEnum> = new EventEmitter<ButtonsTypeEnum>();

  constructor() { }

  public outputHandler(type: ButtonsTypeEnum): void {
    this.clickHandler.next(type)
  }

}
