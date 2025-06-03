import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextComponent } from "../../../../../_core/components/forms/input-text/input-text.component";
import { ButtonComponent } from "../../../../../_core/components/forms/button/button.component";
import { CommonModule } from '@angular/common';
import { InputDateComponent } from "../../../../../_core/components/forms/input-date/input-date.component";
import { FinancialProductsService } from '../../services/financial-products.service';
import { finalize, timer } from 'rxjs';
import { getCurrentDate } from '../../../../../_core/utils/dates';
import { AlertService } from '../../../../../_core/services/alert.service';

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

  title: string = "Formulario de registro";
  form!: FormGroup;
  today: string = getCurrentDate();
  currentId: string | null = null;

  constructor(
    private _router: Router,
    private _fbBuilder: FormBuilder,
    private _financialProductsSvc: FinancialProductsService,
    private _activatedRoute: ActivatedRoute,
    private _alertSvc: AlertService
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
    this.validateReleaseDate();

    this._activatedRoute.params.subscribe(params => {
      this.currentId = params['id'];
      this.currentId ? this.getFinancialProductById(this.currentId) : this.checkIfIdExists();
    })
  }

  getFinancialProductById(id: string) {
    this._financialProductsSvc.getById(id).subscribe({
      next: (response) => {
        if (response) {
          this.form.patchValue(response);
          this.title = "Editar producto financiero";
        }
      },
      error: (error) => {
        this._router.navigate(['/financial-products']);
      }
    });
  }

  checkIfIdExists() {
    const idControl = this.form.get('id');
    if (idControl) {
      idControl.valueChanges.subscribe((value: string) => {
        if (value && (value.trim().length >= 3 && value.trim().length <= 10)) {
          this._financialProductsSvc.checkId(value).subscribe({
            next: (response) => {
              if (response) {
                idControl.setErrors({ 'idExists': true });
              } else {
                idControl.setErrors(null);
              }
            }
          });
        }
      });
    }
  }

  validateReleaseDate() {
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

    this.form.get('date_revision')?.enable();

    const request = this.currentId ? this._financialProductsSvc.updateAsync(this.currentId, this.form.value) : this._financialProductsSvc.saveAsync(this.form.value);

    request.pipe(
      finalize(() => {
        this.form.get('date_revision')?.disable();
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this._router.navigate(['/financial-products']);
          const message = "Producto financiero " + (this.currentId ? "editado" : "creado") + " correctamente."
          this._alertSvc.setAlertMessage(message);
          this._alertSvc.setShowSuccessAlert(true);
        }
      }
    });
  }

}
