import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPriceFormat]',
})
export class PriceFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = event.target.value;

    value = value.replace(/[^0-9,./]/g, '');

    const formattedValue = this.formatPrice(value);

    event.target.value = formattedValue;
  }

  private formatPrice(value: string): string {
    let formattedValue = 'R$ ';

    const parts = value.split(',');
    let integerPart = parts[0];
    const decimalPart = parts[1];
    const hasComma = value.includes(',');

    integerPart = integerPart.replace(/\./g, '');

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    formattedValue += integerPart;
    if (hasComma || decimalPart) {
      if (decimalPart) {
        const limitedDecimalPart = decimalPart.slice(0, 2);
        formattedValue += ',' + limitedDecimalPart.replace(/[^0-9]/g, '');
      } else {
        formattedValue += ',';
      }
    }

    return formattedValue;
  }
}
