import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitLimit]',
})
export class DigitLimitDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const maxLength = 3;
    let inputValue = this.el.nativeElement.value;
    let newValue = '';

    if (inputValue.startsWith('-')) {
      inputValue = inputValue.slice(1);
    }

    for (var i = 0; i < maxLength; i++) {
      newValue += inputValue.charAt(i);
    }

    this.el.nativeElement.value = newValue;
  }
}
