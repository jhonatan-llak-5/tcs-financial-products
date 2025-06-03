import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextComponent } from "../../../../../_core/components/forms/input-text/input-text.component";
import { ButtonComponent } from "../../../../../_core/components/forms/button/button.component";
import { CommonModule } from '@angular/common';
import { InputDateComponent } from "../../../../../_core/components/forms/input-date/input-date.component";

@Component({
  selector: 'app-financial-product-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    ButtonComponent,
    CommonModule,
    InputDateComponent
],
  templateUrl: './financial-product-form.component.html',
  styleUrl: './financial-product-form.component.scss'
})
export class FinancialProductFormComponent implements OnInit {

  form!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private _router: Router,
    private _fbBuilder: FormBuilder
  ) {
    this.form = this._fbBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-z0-9-]+$/)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required]],
      date_revision: ['', [Validators.required]],
    });

    this.form.get('date_revision')?.disable();
  }

  ngOnInit(): void {
    this.form.get('date_release')?.valueChanges.subscribe((releaseValue: string) => {
      if (releaseValue) {
        const releaseDate = new Date(releaseValue);
        const revisionDate = new Date(releaseDate);
        revisionDate.setFullYear(revisionDate.getFullYear() + 1);

        const formatted = revisionDate.toISOString().split('T')[0];

        this.form.get('date_revision')?.setValue(formatted);
      } else {
        this.form.get('date_revision')?.reset();
      }
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return

    console.log('Form submitted:', this.form.value);
  }

}
