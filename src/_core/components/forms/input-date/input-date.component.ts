import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss'
})
export class InputDateComponent {
  @Input() group: FormGroup = new FormGroup({});
  @Input() control!: string;
  @Input() minDate: string = '';
  @Input() maxDate: string = '';

  @Input() label!: string;
  @Input() placeholder: string = '';

  get formControl(): AbstractControl {
    return this.group.get(this.control)!;
  }

  showRequiredError(): boolean {
    return this.formControl?.hasError('required') &&
           (this.formControl.dirty || this.formControl.touched);
  }
}
