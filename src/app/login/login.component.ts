import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {apiBaseUrl} from "../api-config";
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private fb: FormBuilder,
              private http: HttpClient,
              @Inject(apiBaseUrl) private apiBaseUrl: string,
              private toast: ToastrService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Function to handle form submission
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.http.post(`${apiBaseUrl}/Authentication/LogIn`, this.loginForm.value).subscribe(
      (response:any) => {
        this.toast.success('Logged in successfully');
        this.router.navigate(['userProfile']).then(
          () => {
            const token = response.token;
            localStorage.setItem('authToken', token);
          }
        );
        this.isLoading = false;
      },
      (error) => {
        if (error.status === 400) {
          this.toast.error('Email is unconfirmed, please confirm it first');
        }else if(error.status ===401)
        {
          this.toast.error('Email or password is incorrect');
        }else {
          this.toast.error('Internal Server Error Please try again later');
        }
        this.isLoading = false;
      }
    );

  }
}
