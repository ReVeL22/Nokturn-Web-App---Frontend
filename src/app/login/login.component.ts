import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private userService: UserService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {

  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  f() {
    return this.loginForm.controls;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 15000,
    });
  }

  onSubmit() {
    const message = "Zalogowano";
    this.userService.postUserLogin(this.loginForm.value).subscribe(
      (data) => {
        localStorage.setItem('token', data.toString());
        this._router.navigate(['/offers']);
      },
      (error) => {
        this.openSnackBar(error.error, 'X');
      },
      () => {
        localStorage.setItem('pLength', this.loginForm.controls['password'].value.length);
        this.openSnackBar(message, 'X');
      }
    );
  }

  moveToRegister() {
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }
}
