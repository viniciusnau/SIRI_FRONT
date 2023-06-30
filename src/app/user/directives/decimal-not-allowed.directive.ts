import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[decimalNotAllowed]',
})
export class DecimalNotAllowedDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let inputValue = this.el.nativeElement.value;

    if (inputValue.includes('.')) {
      inputValue = inputValue.split('.').join('');
    }

    this.el.nativeElement.value = inputValue;
  }
}
