import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { IUsers } from '../users';
import { MessageService } from '../_services/message.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IPosts } from '../posts';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from "lodash";
import { throws } from 'assert';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.sass']
})
export class UserPanelComponent implements OnInit {

  userLogged = localStorage.getItem('token');
  user: IUsers;
  post: IPosts;
  userInfo: string = 'Jestem 24 letnim gitarzysta z podkarpacia, chciałbym grać w zespole metalowym i podbijać świat z najlepszymi piosenkami';
  passLength: string;
  edition: boolean = false;
  passwordEdition: boolean = false;
  passwordSpan: boolean = false;
  updateForm: FormGroup;
  hasPost: boolean = true;
  instruments: Array<boolean>;
  selectedInstruments: [string];
  bands: Array<boolean>;
  instrumentsNames: Array<string> = this.messageService.instrumentsNames;
  bandsNames: Array<string> = this.messageService.bandsNames;

  constructor(private userService: UserService,
    private messageService: MessageService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      (data) => this.user = data,
      (err) => console.log(err.error),
      () => {
        this.userService.getPostDetails().subscribe(
          (data) => this.post = data,
          (error) => console.log(error.error),
          () => {
            if (!this.post.instruments) {
              this.post = {
                name: this.user.name,
                email: this.user.email,
                city: this.user.city,
                about: '-',
                band: [false, false, false, false],
                instruments: [false, false, false, false, false]
              };
              this.hasPost = false;
            } else {
              this.instruments = this.post.instruments;
              this.bands = this.post.band;
            }
            this.forms();
          }
        )

      }
    );

    this.passLength = localStorage.getItem('pLength');
  }

  forms() {
    this.updateForm = new FormGroup({
      updateUser: new FormGroup({
        email: new FormControl(this.user.email, [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)]),
        city: new FormControl(this.user.city, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      }),
      updatePost: new FormGroup({
        name: new FormControl(this.user.name),
        email: new FormControl(this.user.email, [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)]),
        city: new FormControl(this.user.city, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        instruments: new FormArray([
          new FormControl(this.instruments[0]),
          new FormControl(this.instruments[1]),
          new FormControl(this.instruments[2]),
          new FormControl(this.instruments[3]),
          new FormControl(this.instruments[4])
        ]),
        band: new FormArray([
          new FormControl(this.bands[0]),
          new FormControl(this.bands[1]),
          new FormControl(this.bands[2]),
          new FormControl(this.bands[3])
        ]),
        about: new FormControl(this.post.about, [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      })
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 15000,
    });
  }

  edit() {
    this.edition = !this.edition;
    if (document.querySelector('i')[1]) {
      document.querySelectorAll('i')[1].classList.remove('yellow');
    }
    this.passwordEdition = false;
  }

  editPassword() {
    this.passwordEdition = !this.passwordEdition;
    document.querySelectorAll('i')[1].classList.toggle('yellow');
  }

  onSubmit() {
    if (this.updateForm.get('updateUser').get('password').value == '') {
      this.updateForm.get('updateUser').patchValue({ password: this.user.password });
    }

    this.userService.putUser(this.updateForm.get('updateUser').value).subscribe(
      (data) => { },
      (error) => console.log(error.error),
      () => this.openSnackBar('Poprawnie zaktualizowano dane', 'X')
    );

    if (this.hasPost) {
      this.userService.putPost(this.updateForm.get('updatePost').value).subscribe(
        (data) => { },
        (error) => console.log(error.error),
        () => { }
      );
    }
    else {
      this.userService.postPost(this.updateForm.get('updatePost').value).subscribe(
        (data) => { },
        (error) => console.log(error.error),
        () => { }
      );
    }
    this.hasPost = true;
    this.edition = false;
    this.updateForm.get('updateUser').patchValue({ password: '' });
  }
}
