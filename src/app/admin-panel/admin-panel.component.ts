import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsers } from '../users';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.sass']
})
export class AdminPanelComponent implements OnInit {

  edit: string;
  allUsers: Array<IUsers>;
  choosedUserEmail: string;
  updateForm: FormGroup;

  constructor(private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data) => this.allUsers = data,
      (error) => console.log(error.error),
      () => { }
    )
  }

  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action, {
  //     duration: 15000,
  //   });
  // }

  // deleteUser(id) {
  //   this.userService.deleteUser(id).subscribe(
  //     (data) => { },
  //     (error) => console.log(error.error),
  //     () => {
  //       this.openSnackBar('Poprawnie usunięto użytkownika', 'X');
  //     }
  //   )
  //   location.reload();
  // }

  // updateUser() {
  //   this.userService.putUser(this.updateForm.value).subscribe(
  //     (data) => { },
  //     (error) => console.log(error.error),
  //     () => {
  //       this.openSnackBar('Poprawnie zaktualizowano dane użytkownika', 'X');
  //     }
  //   )
  // }
}
