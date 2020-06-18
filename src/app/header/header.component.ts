import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

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
}
