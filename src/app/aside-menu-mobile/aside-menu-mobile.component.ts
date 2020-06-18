import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside-menu-mobile',
  templateUrl: './aside-menu-mobile.component.html',
  styleUrls: ['./aside-menu-mobile.component.sass']
})
export class AsideMenuMobileComponent implements OnInit {

  userLogged = localStorage.getItem('token');

  constructor() { }

  ngOnInit(): void {
  }

  hamburger() {
    document.querySelectorAll('.ham-el')[1].classList.toggle('active');
    document.querySelectorAll('.ham-el')[3].classList.toggle('active');
    document.querySelectorAll('.ham-el')[0].classList.toggle('not-active');
    document.querySelectorAll('.ham-el')[2].classList.toggle('not-active');
    document.querySelector('.aside-nav').classList.toggle('active');
  }

  logout() {
    this.hamburger();
    localStorage.clear();
  }
}
