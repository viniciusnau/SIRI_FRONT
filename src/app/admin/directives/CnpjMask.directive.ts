import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cnpjMask]',
})
export class CnpjMaskDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputValue = event.target.value;
    const unmaskedValue = this.unmaskCnpj(inputValue);
    const maskedValue = this.maskCnpj(unmaskedValue);
    event.target.value = maskedValue;
  }

  unmaskCnpj(value: string): string {
    return value.replace(/[^\d]/g, '');
  }

  maskCnpj(value: string): string {
    const digitsOnly = value.replace(/[^\d]/g, '');
    let maskedValue = '';

    if (digitsOnly.length > 0) {
      maskedValue += `${digitsOnly.slice(0, 2)}`;
    }

    if (digitsOnly.length > 2) {
      maskedValue += `.${digitsOnly.slice(2, 5)}`;
    }

    if (digitsOnly.length > 5) {
      maskedValue += `.${digitsOnly.slice(5, 8)}`;
    }

    if (digitsOnly.length > 8) {
      maskedValue += `/${digitsOnly.slice(8, 12)}`;
    }

    if (digitsOnly.length > 12) {
      maskedValue += `-${digitsOnly.slice(12)}`;
    }

    return maskedValue;
  }
}
