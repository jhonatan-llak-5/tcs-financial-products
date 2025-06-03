import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../../forms/button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-modal',
  imports: [
    ButtonComponent,
    CommonModule
  ],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss'
})
export class BaseModalComponent {

  @Input() showModal: boolean = false;

  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Output() onConfirm: EventEmitter<void> = new EventEmitter();

  constructor() { }

  cancelAction() {
    this.onClose.emit();
  }

  confirmAction() {
    this.onConfirm.emit();
  }

}
