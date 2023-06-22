import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-pagination',
  templateUrl: './user-pagination.component.html',
  styleUrls: ['./user-pagination.component.scss'],
})
export class UserPaginationComponent {
  @Input() currentPage: number;
  @Input() response: any;
  @Input() page: any;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  hasPrevious(): boolean {
    return this.currentPage > 1;
  }

  hasNext(): boolean {
    if (this.response) return !!this.response[this.page];
    return !!this.page;
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
