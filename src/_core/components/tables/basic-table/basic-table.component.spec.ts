import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicTableComponent } from './basic-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ITableColumns } from '../../../interfaces/table.interface,';
import { IFinancialProduct } from '../../../../app/modules/financial-products/interfaces/financial-products.interface';
import { table } from '../../../../app/modules/financial-products/config/table';

@Component({ selector: 'app-input-search', template: '' })
class MockInputSearchComponent {}

@Component({ selector: 'app-button', template: '' })
class MockButtonComponent {}

@Component({ selector: 'app-skeleton-table', template: '' })
class MockSkeletonTableComponent {}

describe('BasicTableComponent', () => {
  let component: BasicTableComponent;
  let fixture: ComponentFixture<BasicTableComponent>;

  const mockColumns: ITableColumns[] = table.columns;
  const mockData: IFinancialProduct[] = table.data;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BasicTableComponent,
        ReactiveFormsModule,
        MockInputSearchComponent,
        MockButtonComponent,
        MockSkeletonTableComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTableComponent);
    component = fixture.componentInstance;
    component.columns = mockColumns;
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    expect(component.filteredData.length).toBe(20);
    expect(component.paginatedData.length).toBe(component.defaultSize);
  });

  it('should filter data based on input', () => {
    component.searchValue.setValue('Fondo Flex');
    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].name).toBe('Fondo Flex');

    component.searchValue.setValue('');
    expect(component.filteredData.length).toBe(20);
  });

  it('should update pagination when page size changes', () => {
    component.defaultSize = 2;
    component.changeSizeData();
    expect(component.paginatedData.length).toBe(2);
    expect(component.totalPages).toBe(10);
  });

  it('should paginate correctly', () => {
    component.defaultSize = 1;
    component.changeSizeData();

    expect(component.currentPage).toBe(1);
    expect(component.paginatedData[0].name).toBe('Crédito Ágil');

    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.paginatedData[0].name).toBe('Fondo Flex');

    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not go past last or before first page', () => {
    component.defaultSize = 2;
    component.changeSizeData();

    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toBe(1);

    component.currentPage = 2;
    component.nextPage();
    expect(component.currentPage).toBe(3);
  });

  it('should emit editRow event', () => {
    spyOn(component.onEdit, 'emit');
    component.editRow(mockData[0]);
    expect(component.onEdit.emit).toHaveBeenCalledWith(mockData[0]);
  });

  it('should emit deleteRow event', () => {
    spyOn(component.onDelete, 'emit');
    component.deleteRow(mockData[1]);
    expect(component.onDelete.emit).toHaveBeenCalledWith(mockData[1]);
  });

  it('should emit addRow event', () => {
    spyOn(component.onAdd, 'emit');
    component.addRow();
    expect(component.onAdd.emit).toHaveBeenCalled();
  });

  it('should toggle and close dropdowns', () => {
    const mockDiv = document.createElement('div');
    mockDiv.classList.add('dropdown');
    document.body.appendChild(mockDiv);

    const event = {
      target: mockDiv
    } as unknown as MouseEvent;

    mockDiv.classList.add('show');
    component.toggleDropdown(event);
    expect(mockDiv.classList.contains('show')).toBe(false);

    mockDiv.classList.add('show');
    component.closeDropdowns();
    expect(mockDiv.classList.contains('show')).toBe(false);

    document.body.removeChild(mockDiv);
  });

  it('should call loadData on data change', () => {
    const newData = Array.from({ length: 20 }, (_, i) => ({ name: `Item ${i + 1}` }));
    component.columns = table.columns;
    component.data = newData;

    component.ngOnChanges({
      data: {
        currentValue: newData,
        previousValue: [],
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.filteredData.length).toBe(20);
    expect(component.paginatedData.length).toBe(5); 
  });
});
