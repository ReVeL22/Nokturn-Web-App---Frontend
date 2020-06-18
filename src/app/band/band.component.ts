import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../_services/user.service';
import { IBands } from '../bands';
import { IUsers } from '../users';
import { IInvites } from '../invites';

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.sass']
})
export class BandComponent implements OnInit {

  userLogged = localStorage.getItem('token');
  allInvites: any;
  admin: boolean = false;
  loggedUserData: IUsers;
  token: string = localStorage.getItem('token');
  invitedUser: string;
  invites: Array<IInvites>;
  newBand: boolean = false;
  users: IUsers[];
  band: IBands = {
    usersId: null,
    name: null
  };
  edition: boolean = false;
  newBandName: {
    name: string;
  } = {
      name: ''
    };
  bandMembers: IUsers[];
  noBand: boolean = false;

  constructor(private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getBand().subscribe(
      (data) => {
        this.band = data[0];
      },
      (error) => console.log(error.error),
      () => {
        if (this.band) {
          this.bandMembers = this.getBandMemberData();
        }
      }
    )
    this.userService.getUserDetails().subscribe(
      (data) => this.loggedUserData = data,
      (error) => console.log(error.error),
      () => {
        this.userService.getInvites().subscribe(
          (data) => {
            if (data.length > 0) {
              this.invites = data.filter((e) => e.endUserId == this.loggedUserData._id);
            }
          },
          (error) => console.log(error.error),
          () => { }
        )
      }
    )
  }

  getBandMemberData() {
    let onlyBandMembers: IUsers[] = [];
    let userData: IUsers[];
    this.userService.getAllUsers().subscribe(
      (data) => userData = data,
      (error) => console.log(error.error),
      () => {
        userData.forEach((e) => {
          if (this.band.usersId.includes(e._id)) {
            onlyBandMembers.push(e)
          }
        });
        this.users = userData;
      }
    )
    return onlyBandMembers;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 15000,
    });
  }

  edit() {
    this.edition = true;
  }

  submit() {
    this.userService.postBand(this.newBandName).subscribe(
      (data) => { },
      (error) => console.log(error.error),
      () => {
        location.reload();
        this.openSnackBar('Poprawnie dodano zespół', 'X');
      }
    )
  }

  deleteBand() {
    this.userService.deleteBand().subscribe(
      (data) => { },
      (error) => console.log(error.error),
      () => {
        location.reload();
        this.openSnackBar('Poprawnie usunięto zespół', 'X');
      }
    )
  }

  deleteInvite(userId: string) {
    console.log(userId)
    this.userService.deleteInvite(userId).subscribe(
      (data) => { },
      (error) => console.log(error.error),
      () => {
        location.reload();
        this.openSnackBar('Poprawnie usunięto zaproszenie', 'X');
      }
    )
  }

  joinTheBand(invite) {
    let theBand;
    this.userService.getUserBand(invite.userId).subscribe(
      (data) => theBand = data,
      (error) => console.log(error.error),
      () => {
        theBand[0].usersId.push(this.loggedUserData._id);
        console.log(theBand[0].usersId[0], theBand[0].usersId, invite.name)
        this.userService.putBand(theBand[0].usersId[0], theBand[0].usersId, invite.name).subscribe(
          (data) => { },
          (error) => console.log(error.error),
          () => { }
        )
      }
    )
    this.userService.deleteInvite(invite.userId).subscribe(
      (data) => { },
      (error) => console.log(error.error),
      () => {

      }
    )
    location.reload();
  }

  sendInvite(endUserId: string, name: string) {
    this.userService.getAllInvites().subscribe(
      (data) => { this.allInvites = data },
      (error) => console.log(error.error),
      () => {
        if (this.allInvites.find(e => {
          return (e.userId == this.loggedUserData._id && e.endUserId == endUserId)
        }
        )) {
          this.openSnackBar('Nie można wysłać drugiego zaproszenia', 'X');
        } else {
          this.userService.sendInvite({ endUserId, name }).subscribe(
            (data) => { },
            (error) => console.log(error.error),
            () => {
              this.openSnackBar('Poprawnie wysłano zaproszenie', 'X');
            }
          )
        }
      }
    )
    location.reload();
  }

  leaveBand() {
    let theBand;
    this.userService.getUserBand(this.loggedUserData._id).subscribe(
      (data) => theBand = data,
      (error) => console.log(error.error),
      () => {
        theBand[0].usersId = theBand[0].usersId.filter((e) => e != this.loggedUserData._id);
        theBand[0].usersId.push(this.loggedUserData._id);
        this.userService.putBand(theBand[0].usersId[0], theBand[0].usersId, theBand[0].name).subscribe(
          (data) => { },
          (error) => console.log(error.error),
          () => { this.openSnackBar('Poprawnie opuszczono zespół', 'X'); }
        )
      }
    )
  }
}
