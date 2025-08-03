import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  isSubmitted: boolean = false;
  isSubmitting: boolean = false;

  formBuilder = inject(FormBuilder);

  credential = { email: 'admin@gmail.com', password: 'admin@123' }

  storageService = inject(StorageService);

  constructor(
    private title: Title, 
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.title.setTitle('Login');
    this.initForm();
  }

  //#region init form
  initForm() {
    this.myForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }
  get myFormControl(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  onReset(){
    this.isSubmitted = false;
    this.isSubmitting = false;
    this.myForm.reset();
  }
  //#endregion

  //#region onSubmit
  onSubmit() {
    this.isSubmitted = true;
    if (this.myForm.invalid) {
      this.toastr.error('Please enter required data');
    } else {
      this.isSubmitting = true;
      let data = this.myForm.value;

      if(this.credential.email == data['email'] && this.credential.password == data['password']){
        setTimeout(() => {
          this.storageService.setItem('credential', data);
          const userData = { name: 'Admin', id: 1, role: 'admin'  }
          this.storageService.setItem('userData', userData);
          this.onReset();
          this.router.navigateByUrl("/");
        }, 2000);
      }else {
        this.toastr.error("Please enter valid credentials!");
        this.isSubmitting = false;
      }
    }
  }
  //#endregion
}
