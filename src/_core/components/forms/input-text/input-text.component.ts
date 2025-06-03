import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent{
  @Input() group!: FormGroup;
  @Input() control!: string;

  @Input() label!: string;
  @Input() inputType: 'text' | 'number' = 'text';
  @Input() placeholder: string = '';

  minLength: number = 0;
  maxLength: number = 0;

  get formControl(): AbstractControl {
    return this.group.get(this.control)!;
  }

  isRequired(): boolean {
    const validator = this.formControl.validator?.({} as any);
    return !!validator?.['required'];
  }

  showRequiredError(): boolean {
    return this.formControl.hasError('required') &&
      (this.formControl.dirty || this.formControl.touched);
  }

  showPatternError(): boolean {
    return this.formControl.hasError('pattern') &&
      (this.formControl.dirty || this.formControl.touched);
  }

  showMinLengthError(): boolean {
    this.minLength = this.formControl.getError('minlength')?.requiredLength || 0;
    return this.formControl.hasError('minlength') &&
      (this.formControl.dirty || this.formControl.touched);
  }

  showMaxLengthError(): boolean {
    this.maxLength = this.formControl.getError('maxlength')?.requiredLength || 0;
    return this.formControl.hasError('maxlength') &&
      (this.formControl.dirty || this.formControl.touched);
  }
}