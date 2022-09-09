import {Injectable} from "@angular/core";
import {SoundEnum} from "../enums/app.enum";

@Injectable({providedIn: 'root'})
export class SoundService {
  private _sound: HTMLAudioElement = new Audio();

  public _loadSound(typeSound: SoundEnum): void {
    this._sound.src = typeSound;
    this._sound.load();
    this._sound.play();
  }
}
