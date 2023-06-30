import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[rgMask]',
})
export class IdentityDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.slice(0, 20); // Limit input to 20 characters
    const maskedValue = this.maskRg(inputValue);
    event.target.value = maskedValue;
  }

  maskRg(value: string): string {
    const digitsOnly = value.replace(/[^\d]/g, '');
    const maskedValue = `${digitsOnly.slice(0, 2)}.${digitsOnly.slice(
      2,
      5,
    )}.${digitsOnly.slice(5, 20)}`;
    return maskedValue;
  }
}
