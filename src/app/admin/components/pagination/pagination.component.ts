import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="pagination">
      <button class="previous" [disabled]="!hasPrevious()" (click)="goToPreviousPage()">
        Voltar
      </button>
      <span class="page-number">{{ currentPage }}</span>
      <button class="next" [disabled]="!hasNext()" (click)="goToNextPage()">
        Próximo
      </button>
    </div>
  `,
  styles: [
    `
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      }

      .page-number {
        margin: 0 10px;
      }
    `,
  ],
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() apiResponse: any;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  hasPrevious(): boolean {
    return this.currentPage > 1;
  }

  hasNext(): boolean {
    return !!this.apiResponse?.next;
  }

  goToPreviousPage(): void {
    if (this.hasPrevious()) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.hasNext()) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
