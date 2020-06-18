import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { IUsers } from '../users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  signupForm: FormGroup;
  users: IUsers[];

  constructor(private userService: UserService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 15000,
    });
  }

  onSubmit() {
    const message = "Rejestracja przebiegła pomyślnie, możesz się zalogować";
    this.userService.postUser(this.signupForm.value).subscribe(
      (data) => {
        this._router.navigate(['/login']);
        this.openSnackBar(message, 'X')
      },
      (error) => {
        this.openSnackBar(error.error, 'X')
      },
      () => { }
    )
  }

  moveToLogin() {
    this._router.navigate(['/login'], { relativeTo: this._activatedRoute });
  }
}
