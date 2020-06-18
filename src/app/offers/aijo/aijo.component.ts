import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aijo',
  templateUrl: './aijo.component.html',
  styleUrls: ['./aijo.component.sass']
})
export class AijoComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  disabled = true;
  value: string;

  constructor() { }

  ngOnInit(): void {
  }

  iColor(e) {
    let el = document.querySelector('.i');
    if (e.target.value != '') {
      el.firstElementChild.classList.add('green');
      this.disabled = false;
    } else {
      el.firstElementChild.classList.remove('green');
      this.disabled = true;
    }
  }

  filter() {
    this.value = document.querySelector('textarea').value;
    this.valueChange.emit(this.value);
  }
}
