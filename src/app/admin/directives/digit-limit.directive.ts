import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitLimit]',
})
export class DigitLimitDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const maxLength = 6;
    let inputValue = this.el.nativeElement.value;

    if (inputValue.startsWith('-')) {
      inputValue = inputValue.slice(1);
    }

    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    this.el.nativeElement.value = inputValue;
  }
}
