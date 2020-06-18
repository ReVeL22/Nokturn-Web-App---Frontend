import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.sass']
})
export class GuestPageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._router.navigate(['/offers']);
    }
  }

  shake: boolean = false;


  shakec(): void {
    this.shake = !this.shake;
    setTimeout(() => {
      this.shake = !this.shake;
    }, 700);
  }

  scroll(): void {
    window.scrollTo({
      top: window.outerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
