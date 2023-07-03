import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[contactMask]',
})
export class ContactMaskDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputValue = event.target.value;
    const unmaskedValue = this.unmaskContact(inputValue);
    const maskedValue = this.maskContact(unmaskedValue);
    event.target.value = maskedValue;
  }

  unmaskContact(value: string): string {
    return value.replace(/[^\d()]/g, '');
  }

  maskContact(value: string): string {
    const digitsOnly = value.replace(/[^\d]/g, '');
    let maskedValue = '';

    if (digitsOnly.length > 0) {
      maskedValue += `(${digitsOnly.slice(0, 2)}`;

      if (digitsOnly.length > 2) {
        maskedValue += `) ${digitsOnly.slice(2, 7)}`;

        if (digitsOnly.length > 7) {
          maskedValue += `-${digitsOnly.slice(7, 11)}`;
        }
      }
    }

    return maskedValue;
  }
}
