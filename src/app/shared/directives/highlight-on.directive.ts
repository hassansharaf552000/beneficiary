import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
@Directive({
  selector: '[appHighlightOnHover]'
})
export class HighlightOnDirective {
  @Input('appHighlightOnHover') hoverColor: string = 'lightyellow';
  private originalBackground!: string | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.originalBackground = this.el.nativeElement.style.backgroundColor;
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.hoverColor
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.originalBackground
    );
  }
}
