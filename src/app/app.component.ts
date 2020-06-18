import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from './users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  currentUser: IUsers;
  title: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
}