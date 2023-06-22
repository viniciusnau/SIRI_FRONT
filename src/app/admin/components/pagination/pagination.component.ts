import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() response: any;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  hasPrevious(): boolean {
    return this.currentPage > 1;
  }

  hasNext(): boolean {
    return !!this.response?.next;
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
