import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[negativeNotAllowed]',
})
export class NegativeNotAllowedDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let inputValue = this.el.nativeElement.value;

    if (inputValue.startsWith('-')) {
      inputValue = inputValue.slice(1);
    }

    this.el.nativeElement.value = inputValue;
  }
}
