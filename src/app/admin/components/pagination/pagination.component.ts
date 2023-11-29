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

  constructor() {}

  hasPrevious(): boolean {
    return this.currentPage > 1;
  }

  hasNext(): boolean {
    const totalPage = this.response?.count / 15;
    return !!this.response?.next && this.currentPage < totalPage;
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

  handleTotalPage(pages) {
    return Math.ceil(pages) > 0 ? Math.ceil(pages) : '1';
  }
}
