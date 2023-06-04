import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from '../api-config';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder ,
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(apiBaseUrl) private apiBaseUrl: string,
    private toast: ToastrService,
    private router: Router) {
    this.signUpForm = this.formBuilder.group({
      fullName:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.http.post(`${apiBaseUrl}/Authentication/SignUp`, this.signUpForm.value).subscribe(
      (response) => {
        this.toast.success('Please confirm the email');
        this.signUpForm.reset();
        this.router.navigate(['']);
        this.isLoading = false;
      },
      (error) => {
        if(error.status === 400){
          this.toast.error('User already exists');
        }else{
          this.toast.error('Internal Server Error Please try again later');
        }
        this.isLoading = false;
      }
    );
  }
}
