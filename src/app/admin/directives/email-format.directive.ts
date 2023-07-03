import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmailFormat]',
})
export class EmailFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    // Get input element value
    let value = event.target.value;

    // Format the value as an email
    const formattedValue = this.formatEmail(value);

    // Update the input element value
    event.target.value = formattedValue;
  }

  private formatEmail(value: string): string {
    // Remove leading and trailing white spaces
    value = value.trim();

    // Convert to lowercase
    value = value.toLowerCase();

    return value;
  }
}
