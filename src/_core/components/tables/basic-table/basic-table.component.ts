import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ITableColumns } from '../../../interfaces/table.interface,';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSearchComponent } from "../../forms/input-search/input-search.component";
import { ButtonComponent } from "../../forms/button/button.component";
import { SkeletonTableComponent } from "../../skeleton/skeleton-table/skeleton-table.component";

@Component({
  selector: 'app-basic-table',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputSearchComponent,
    ButtonComponent,
    SkeletonTableComponent
],
  templateUrl: './basic-table.component.html',
  styleUrl: './basic-table.component.scss'
})
export class BasicTableComponent implements OnInit, OnChanges {
  @Input() columns: ITableColumns[] = [];
  @Input() data: any[] = [];
  @Input() loadingData: boolean = false;
  @Input() showActions: boolean = false;
  @Input() showAddButton: boolean = false;
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onAdd: EventEmitter<void> = new EventEmitter();

  sizeData: number[] = [5, 10, 20];
  defaultSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;

  searchValue: FormControl = new FormControl('');
  dataLength: number = 0;

  filteredData: any[] = [];
  paginatedData: any[] = [];

  ngOnInit(): void {
    this.loadData();

    this.searchValue.valueChanges.subscribe((value: string) => {
      this.filterData(value);
    });
  }

  loadData() {
    this.filteredData = [...this.data];
    this.dataLength = this.filteredData.length;
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.loadData();
    }
  }

  filterData(value: string) {
    if (value) {
      this.filteredData = this.data.filter(item => {
        return this.columns.some(column => {
          const fieldValue = item[column.field];
          return fieldValue && fieldValue.toString().toLowerCase().includes(value.toLowerCase());
        });
      });
    } else {
      this.filteredData = [...this.data];
    }

    this.dataLength = this.filteredData.length;
    this.currentPage = 1;
    this.updatePagination();
  }

  changeSizeData() {
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.defaultSize;
    const endIndex = startIndex + Number(this.defaultSize);
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredData.length / this.defaultSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  toggleDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.dropdown');
    if (dropdown) dropdown.classList.toggle('show');

    const otherDropdowns = document.querySelectorAll('.dropdown.show');
    otherDropdowns.forEach((d) => {
      if (d !== dropdown) d.classList.remove('show');
    });
  }

  closeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown.show');
    dropdowns.forEach(d => d.classList.remove('show'));
  }

  editRow(row: any) {
    this.onEdit.emit(row);
    this.closeDropdowns();
  }

  deleteRow(row: any) {
    this.onDelete.emit(row);
    this.closeDropdowns();
  }

  addRow() {
    this.onAdd.emit();
    this.closeDropdowns();
  }
}
