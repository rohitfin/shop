import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { noSpecialCharsValidators } from '../../core/custom-validators/no-special-chars.validator';
import { forbiddenNameValidator } from '../../core/custom-validators/forbidden-name.validator';
import { uniqueEmailValidator } from '../../core/custom-validators/unique-email.validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, NgMultiSelectDropDownModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;
  isSubmitted: boolean = false;
  isSubmitting: boolean = false;

  arrSkillsSetting = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  }; 

  arrSkills = [
    { item_id: 1, item_text: 'HTML' },
    { item_id: 2, item_text: 'CSS3' },
    { item_id: 3, item_text: 'SASS / SCSS / LESS' },
    { item_id: 4, item_text: 'Bootstrap' },
    { item_id: 5, item_text: 'JavaScript' },
    { item_id: 6, item_text: 'TypeScript' },
    { item_id: 7, item_text: 'Angular' },
    { item_id: 8, item_text: 'JQuery' },
  ];

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Form');

    this.initForm();
  }

  //#region init form
  initForm(): void {
    this.myForm = this.formBuilder.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
        noSpecialCharsValidators,
        forbiddenNameValidator('admin')
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
      ]),
      lastName: new FormControl(''),
      email: new FormControl('', {
        validators: [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ],
        asyncValidators: [uniqueEmailValidator()], // uniqueEmailValidator(this.http)
        updateOn: 'blur'
      }),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[7-9][0-9]{9}$'),
      ]),
      date: new FormControl(''),
      gender: new FormControl(''),

      addressDetail: this.formBuilder.group({
        address: new FormControl(''),
        address2: new FormControl(''),
        state: new FormControl(''),
        district: new FormControl(''),
        pinCode: new FormControl(''),
      }),

      skills: new FormControl(''),
      myExperience: this.formBuilder.array([this.newExperience()])
    });
  }
  get myFormControl(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  //#endregion

  //#region Form Array
  experience(): FormArray {
    return this.myForm.get("myExperience") as FormArray;
  }
  experienceControlValidator(index: number) {
    return this.experience().controls[index] as FormGroup;
  }
  newExperience(): FormGroup {
    return this.formBuilder.group({
      companyName: new FormControl(null, [Validators.required]),
      experience: new FormControl(null, [Validators.required]),
      formDate: new FormControl(null),
      toDate: new FormControl(null)
    })
  }
  addExperience() {
    this.experience().push(this.newExperience());
  }
  removeExperience(index: number) {
    this.experience().removeAt(index);
  }
  resetExperienceArray(): void {
    const experienceArray = this.experience();
    while (experienceArray.length !== 0) {
      experienceArray.removeAt(0);
    }
    experienceArray.push(this.newExperience());
  }


  //#endregion

  //#region onSubmit
  onSubmit() {
    this.resetExperienceArray();
    console.log(this.myForm.value);
    this.isSubmitted = true;
    // console.log('MyForm controls => ', this.myForm.controls);
    if (this.myForm.invalid) {
      this.toastr.error('Kindly provide the required information.');
    } else {
      this.isSubmitting = true;

      setTimeout(() => {
        console.log('MyForm Value => ', this.myForm.value);
        this.onReset();
      }, 2000);
    }
  }
  onReset() {
    this.myForm.reset();
    this.isSubmitted = false;
    this.isSubmitting = false;
  }
  //#endregion
}
