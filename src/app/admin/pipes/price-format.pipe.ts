import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) {
      return '';
    }

    const [integerPart, decimalPart] = value.toString().split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedValue = `R$${formattedIntegerPart},${decimalPart || '00'}`;

    return formattedValue;
  }
}
