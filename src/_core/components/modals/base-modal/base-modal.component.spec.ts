import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseModalComponent } from './base-modal.component';
import { ButtonComponent } from '../../forms/button/button.component';
import { CommonModule } from '@angular/common';

describe('BaseModalComponent', () => {
  let component: BaseModalComponent;
  let fixture: ComponentFixture<BaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseModalComponent, ButtonComponent, CommonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have showModal input default to false', () => {
    expect(component.showModal).toBe(false);
  });

  it('should emit onClose when cancelAction is called', () => {
    spyOn(component.onClose, 'emit');

    component.cancelAction();

    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should emit onConfirm when confirmAction is called', () => {
    spyOn(component.onConfirm, 'emit');

    component.confirmAction();

    expect(component.onConfirm.emit).toHaveBeenCalled();
  });
});
