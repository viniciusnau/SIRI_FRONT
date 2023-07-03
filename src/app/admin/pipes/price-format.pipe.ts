import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) {
      return '';
    }

    const roundedValue = Number(value.toFixed(2));
    const [integerPart, decimalPart] = roundedValue.toFixed(2).split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedValue = `R$${formattedIntegerPart},${decimalPart}`;

    return formattedValue;
  }
}
