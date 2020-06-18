import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ITours } from '../tours';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass']
})
export class ScheduleComponent implements OnInit {

  userLogged = localStorage.getItem('token');
  edition: boolean = false;
  city: string;
  date: Date;
  tours: ITours[];
  newTour: ITours = { city: '', eventDate: this.date };

  constructor(private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getTours().subscribe(
      (data) => this.tours = data,
      (error) => console.log(error.error),
      () => { }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 15000,
    });
  }

  addMode() {
    this.edition = !this.edition;
  }

  addNewEvent(city: string, date: Date) {
    this.newTour.city = city;
    this.newTour.eventDate = date;
    this.userService.postTour(this.newTour).subscribe(
      (data) => { },
      (error) => console.log(error.error),
      () => {
        location.reload();
        this.openSnackBar('Poprawnie dodano nową imprezę', 'X');
      }
    )
    this.edition = !this.edition;
  }

  deleteEvent(id) {
    this.userService.deleteTour(id).subscribe(
      (data) => { },
      (error) => console.log(error.error),
      () => {
        location.reload();
        this.openSnackBar('Poprawnie usunięto imprezę', 'X');
      }
    )
  }
}
