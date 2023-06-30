import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cpfMask]',
})
export class CpfMaskDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputValue = event.target.value;
    const maskedValue = this.maskCpf(inputValue);
    this.elementRef.nativeElement.value = maskedValue;
    event.stopPropagation();
  }

  @HostListener('keydown.backspace', ['$event'])
  onBackspace(event: any) {
    const inputValue = event.target.value;
    const cursorPosition = event.target.selectionStart;
    const newValue = this.removePreviousCharacter(inputValue, cursorPosition);
    this.elementRef.nativeElement.value = newValue;
    event.stopPropagation();
    event.preventDefault();
  }

  maskCpf(value: string): string {
    const digitsOnly = value.replace(/[^\d]/g, '');
    let maskedValue = '';

    if (digitsOnly.length > 0) {
      maskedValue += `${digitsOnly.slice(0, 3)}`;
    }

    if (digitsOnly.length > 3) {
      maskedValue += `.${digitsOnly.slice(3, 6)}`;
    }

    if (digitsOnly.length > 6) {
      maskedValue += `.${digitsOnly.slice(6, 9)}`;
    }

    if (digitsOnly.length > 9) {
      maskedValue += `-${digitsOnly.slice(9, 11)}`;
    }

    return maskedValue;
  }

  removePreviousCharacter(value: string, cursorPosition: number): string {
    if (cursorPosition > 0) {
      const valueBeforeCursor = value.slice(0, cursorPosition - 1);
      const valueAfterCursor = value.slice(cursorPosition);
      const unmaskedValue = valueBeforeCursor.replace(/[^\d]/g, '');
      const newValue = unmaskedValue + valueAfterCursor;
      const maskedValue = this.maskCpf(newValue);
      return maskedValue;
    }

    return value;
  }
}
