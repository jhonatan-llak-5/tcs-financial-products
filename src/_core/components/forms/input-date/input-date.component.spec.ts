import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDateComponent } from './input-date.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    component.control = 'date_release';
    component.group = new FormGroup({
      date_release: new FormControl('', Validators.required)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
