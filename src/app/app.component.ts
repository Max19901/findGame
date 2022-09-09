import {Component} from '@angular/core';
import {AppEnum} from "./core/enums/app.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isShowResult: boolean = false;
  public gameStatus: AppEnum = AppEnum.GAME_END;
}
