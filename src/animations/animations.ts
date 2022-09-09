import {
  animate,
  animateChild,
  AnimationTriggerMetadata, group,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const rotatedState: AnimationTriggerMetadata = trigger('rotatedState', [
  state('false', style({transform: 'rotateY(0)'})),
  state('true', style({transform: 'rotateY(-180deg)'})),
  transition('true => false', [
    animate('400ms ease-out'),
    group([
      query('@fade', animateChild()),
    ])
  ]),
  transition('false => true', [
    animate('250ms ease-in'),
    group([
      query('@fade', animateChild()),
    ])
  ])
]);

export const fade: AnimationTriggerMetadata = trigger('fade', [
  state('true', style({opacity: '1'})),
  state('false', style({opacity: '0'})),
  transition('true => false', animate('0ms ease-out')),
  transition('false => true', animate('50ms ease-in'))
]);
