import {Directive, Renderer2, ElementRef, HostListener, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Directive({
  selector: '[hover]'
})
export class HoverDirective {
  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.1)');
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }

}
