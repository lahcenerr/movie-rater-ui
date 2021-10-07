import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isSubmitted = false;
  registerMode = false;
  authForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private apiService: ApiService,
              private cookieService: CookieService) { }

  ngOnInit(){
    this.authForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
    ]
    });
    const mrToken = this.cookieService.get("mr-token");
    if (mrToken){
      this.router.navigateByUrl('/movies');
    }
   
  }

  get formControls() { return this.authForm.controls; }

  signIn(){
    this.isSubmitted = true;
    if (this.registerMode)
    {
      this.apiService.registerUser(this.authForm.value).subscribe(
        (result: any)  => {
          this.registerMode = false;
    },
    error => console.log(error)
        );
  }
     else{
      this.apiService.loginUser(this.authForm.value).subscribe(
        (result: any)  => {
          this.cookieService.set('mr-token', result.token);
          this.router.navigateByUrl('/movies');
        },
        error => console.log(error)
        );
      }
    
  }

}
