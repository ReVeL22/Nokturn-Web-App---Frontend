import { Component, OnInit, HostListener, Output, ɵConsole } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';
import { IUsers } from '../users';
import { Router } from '@angular/router';
import { IPosts } from '../posts';
import { MessageService } from '../_services/message.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.sass']
})
export class OffersComponent implements OnInit {

  userLogged = localStorage.getItem('token');
  users: string;
  posts: IPosts[];
  tmpPosts: IPosts[];
  tmp: IPosts[];
  postMore: boolean = false;
  usersCities: Array<any> = [];
  postNr: number;
  noInsInput: boolean = false;
  noBandInput: boolean = false;
  wantedPostCity: string = 'none';
  noCityInput: boolean = true;
  cityInput: string;
  citiesForInput: Array<any> = [];
  instrumentsNames = this.messageService.instrumentsNames;
  bandsNames = this.messageService.bandsNames;
  citiesNames = this.messageService.citiesNames;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.showOptionsMenu = false;
    if (scrollY > 100) {
      document.querySelectorAll('.filters')[0].classList.add('none');
      const filters = document.querySelectorAll('.filter');
      // console.log(filters);
      filters.forEach((filter) => {
        filter.classList.add('none');
      })
    } else
      document.querySelectorAll('.filters')[0].classList.remove('none');
  }

  insBase: Array<any> = [
    [
      'gitarzysta',
      'gitarzystą',
      'gitarzystę',
      'gitarzysto',
      'gitarzysty',
      'gitarzyście',
      'gitarzystach',
      'gitarzystami',
      'gitarzystom',
      'gitarzystów',
      'gitarzyści'
    ],
    [
      'basista',
      'bas',
      'basie',
      'basowej',
      'basach',
      'basami',
      'basom',
      'basem',
      'basowi',
      'basu',
      'basy'
    ],
    [
      'perkusista',
      'perkusistą',
      'perkusistę',
      'perkusisto',
      'perkusisty',
      'perkusiście',
      'perkusistach',
      'perkusistami',
      'perkusistom',
      'perkusistów',
      'perkusiści'
    ],
    [
      'klawiszowiec',
      'klawiszowca',
      'klawiszowcem',
      'klawiszowcowi',
      'klawiszowcu',
      'klawiszowców',
      'klawiszowcach',
      'klawiszowcami',
      'klawiszowcom',
      'klawiszowcy',
      'klawiszowce',
      'klawiszowcze',
      'klawisz',
      'klawisza',
      'organista',
      'organistę',
      'organiste'
    ],
    [
      'wokalista',
      'wokalistą',
      'wokalistę',
      'wokalisto',
      'wokalisty',
      'wokaliście',
      'wokalistach',
      'wokalistami',
      'wokalistom',
      'wokalistów',
      'wokaliści',
      'piosenkarz',
      'piosenkarza',
      'piosenkarki',
      'piosenkarkę',
      'wokalistka',
      'wokalistką',
      'wokalistkę',
      'wokalistko',
      'wokalistki',
      'śpiewak',
      'śpiewaka',
      'śpiewającą',
      'śpiewającego',
      'śpiewa',
      'spiewa',
      'wokal'
    ]
  ]

  bandBase: Array<any> = [
    [
      'wesele',
      'weselę',
      'wesela',
      'weselem',
      'weselu',
      'wesel',
      'weselach',
      'weselami',
      'weselom',
      'weselne',
      'ślub',
      'slub',
      'śluby',
      'ślubne',
      'ślubach'
    ],
    [
      'zabawa',
      'zabawą',
      'zabawę',
      'zabawie',
      'zabawo',
      'zabawy',
      'zabawach',
      'zabawami',
      'zabawom',
      'zabaw'
    ],
    [
      'koncert',
      'koncertach',
      'koncertami',
      'koncertom',
      'koncercie',
      'koncertem',
      'koncertowi',
      'koncertu',
      'koncertów',
      'koncerty',
      'koncertowy',
      'metal',
      'rock',
      'metalowego',
      'metalowym',
      'rockowym',
      'rockowego'
    ],
    [
      'niekomercyjny',
      'niekomercyjnego',
      'niekomercyjnemu',
      'niekomercyjnych',
      'niekomercyjnym',
      'niekomercyjnymi',
      'niekomercyjni',
      'niekomercyjna',
      'niekomercyjną',
      'niekomercyjne',
      'niekomercyjnej',
      'niekomercyjnie'
    ]
  ]

  cityBase: Array<any> = [
    [
      'Warszawa',
      'Warszawie',
      'Warszawy'
    ],
    [
      'Kraków',
      'Krakowie',
      'krakowa'
    ],
    [
      'łódź',
      'łodzi'
    ],
    [
      'Wrocław',
      'wrocławiu',
      'wrocławia'
    ],
    [
      'poznań',
      'poznania',
      'poznaniu'
    ],
    [
      'gdańsk',
      'gdańsku',
      'gdańska'
    ],
    [
      'szczecin',
      'szczecina',
      'szczecinu'
    ],
    [
      'bydgoszcz',
      'bydgoszczy',
      'bydgoszczu'
    ],
    [
      'lublin',
      'lublina',
      'lublinu'
    ],
    [
      'białystok',
      'białegostoku'
    ],
    [
      'katowice',
      'katowic',
      'katowicach'
    ],
    [
      'gdynia',
      'gdyni'
    ],
    [
      'częstochowa',
      'częstochowie',
      'częstochowy'
    ],
    [
      'radom',
      'radomiu',
      'radomia'
    ],
    [
      'rzeszów',
      'rzeszowa',
      'rzeszowie'
    ]
  ]

  filters: Array<any> = [
    [
      'Gitara elektryczna',
      'Gitara basowa',
      'Perkusja',
      'Klawisze',
      'Wokal'
    ],
    [
      'Wesela',
      'Zabawy',
      'Koncerty',
      'Granie niekomercyjne'
    ]
  ];

  tempFilterOptionsArray: Array<any> = [
    [
      'Gitara elektryczna',
      'Gitara basowa',
      'Perkusja',
      'Klawisze',
      'Wokal'
    ],
    [
      'Wesela',
      'Zabawy',
      'Koncerty',
      'Granie niekomercyjne'
    ],
    [
      'Warszawa',
      'Kraków',
      'Łódź',
      'Wrocław',
      'Poznań',
      'Gdańsk',
      'Szczecin',
      'Bydgoszcz',
      'Lublin',
      'Białystok',
      'Katowice',
      'Gdynia',
      'Częstochowa',
      'Radom',
      'Rzeszów'
    ]
  ];
  showOptionsMenu: boolean = false;

  constructor(private usersService: UserService,
    public formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.usersService.getPost().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => console.log(error.error),
      () => {
        this.tmpPosts = this.posts
        this.posts.forEach((data) => {
          if (this.usersCities.find(e => e == data.city)) {
          } else {
            this.usersCities.push(data.city);
          }
        });
      }
    );
  }

  showOptions(nr: number): void {
    if (nr != 0)
      document.querySelectorAll('.filter')[nr].classList.toggle('none');
    //get do tempFilterOptionsArray
  }

  addInstrumentFilter(data): void {
    if (this.tempFilterOptionsArray[0].find(e => e == data)) {
      this.tempFilterOptionsArray[0] = this.tempFilterOptionsArray[0].filter(e => e != data);
    } else {
      this.tempFilterOptionsArray[0].push(data);
    }
    this.tmp = this.posts.filter(e => e.instruments[this.tempFilterOptionsArray[0].indexOf(data)] == true);
    let el;
    if (document.querySelector('.' + data.replace(' ', '')).classList.contains('fa-toggle-on')) {
      el = document.querySelector('.' + data.replace(' ', ''))
      el.classList.remove('fa-toggle-on');
      el.classList.add('fa-toggle-off');
      el.style.color = 'red';
    } else {
      el = document.querySelector('.' + data.replace(' ', ''));
      el.classList.remove('fa-toggle-off');
      el.classList.add('fa-toggle-on');
      el.style.color = 'green';
    }
  }

  addBandFilter(data): void {
    if (this.tempFilterOptionsArray[1].find(e => e == data)) {
      this.tempFilterOptionsArray[1] = this.tempFilterOptionsArray[1].filter(e => e != data);
    } else {
      this.tempFilterOptionsArray[1].push(data);
    }
  }

  addCityFilter(data): void {
    this.wantedPostCity = data;
  }

  show(name: string) {
    document.querySelectorAll('.' + name)[0].classList.toggle('unv');
    document.querySelectorAll('.' + name)[1].classList.toggle('unv');
    document.querySelectorAll('.' + name)[2].classList.toggle('unv');
    document.querySelector('i.' + name).classList.toggle('true');
  }

  colorChange(e, nr) {
    e.currentTarget.classList.toggle('dark');
    document.querySelectorAll('.filter')[nr].classList.add('none');
  }

  checkInstruments(element) {
    let instruments = [];
    for (let i = 0; i < element.length; i++) {
      if (element[i]) {
        instruments.push(this.instrumentsNames[i]);
      }
    }
    for (let i = 0; i < instruments.length; i++) {
      if (this.tempFilterOptionsArray[0].indexOf(instruments[i]) != -1) {
        return 1;
      }
    }
    return 0;
  }

  checkBand(element) {
    let bands = [];
    for (let i = 0; i < element.length; i++) {
      if (element[i]) {
        bands.push(this.bandsNames[i]);
      }
    }
    for (let i = 0; i < bands.length; i++) {
      if (this.tempFilterOptionsArray[1].indexOf(bands[i]) != -1) {
        return 1;
      }
    }
    return 0;
  }

  checkCity(element) {
    for (let i = 0; i < this.tempFilterOptionsArray[2].length; i++) {
      if (this.tempFilterOptionsArray[2].indexOf(element) != -1) {
        return 1;
      }
    }
    return 0;
  }

  showText(text) {
    let txt = text.toUpperCase();
    let contain: boolean;
    for (let j = 0; j < this.filters[0].length; j++) {
      contain = true;
      for (let i = 0; i < this.insBase[j].length; i++) {
        if (txt.includes(this.insBase[j][i].toUpperCase())) {
          if (this.tempFilterOptionsArray[0].find(e => e == this.filters[0][j])) {
            contain = false;
            break;
          } else {
            this.tempFilterOptionsArray[0].push(this.filters[0][j]);
            contain = false;
            break;
          }
        }
      }
      if (this.tempFilterOptionsArray[0].find(e => e == this.filters[0][j])) {
        if (contain) {
          this.tempFilterOptionsArray[0] = this.tempFilterOptionsArray[0].filter(e => e != this.filters[0][j]);
        }
      }
    }
    for (let j = 0; j < this.filters[1].length; j++) {
      contain = true;
      for (let i = 0; i < this.bandBase[j].length; i++) {
        console.log(this.bandBase[j][i]);
        if (txt.includes(this.bandBase[j][i].toUpperCase())) {
          if (this.tempFilterOptionsArray[1].find(e => e == this.filters[1][j])) {
            contain = false;
            break;
          } else {
            this.tempFilterOptionsArray[1].push(this.filters[1][j]);
            contain = false;
            break;
          }
        } else {
          this.noBandInput = true;
        }
      }
      if (this.tempFilterOptionsArray[1].find(e => e == this.filters[1][j])) {
        if (contain) {
          this.tempFilterOptionsArray[1] = this.tempFilterOptionsArray[1].filter(e => e != this.filters[1][j]);
        }
      }
    }
    for (let i = 0; i < this.cityBase.length; i++) {
      for (let j = 0; j < this.cityBase[i].length; j++) {
        console.log(this.cityBase[i][j]);
        if (txt.includes(this.cityBase[i][j].toUpperCase())) {
          console.log(this.cityBase[i][j] + 'ZNALAZŁO');
          this.wantedPostCity = this.tempFilterOptionsArray[2][i];
          break;
        }
      }
    }
  }

  loadHints(data) {
    if (data) {
      this.noCityInput = false;
      this.cityInput = data;
    } else {
      this.noCityInput = true;
    }
    let results: Array<any> = [];
    let tempData = data.toUpperCase();
    let allCities = this.usersCities;
    if (data.length > 2) {
      for (let i = 0; i < this.usersCities.length; i++) {
        if (allCities[i].toUpperCase().startsWith(tempData)) {
          results.push(allCities[i]);
        }
      }
    }
    this.citiesForInput = results;
  }

  getPostWithCity(city) {
    this.citiesForInput = city;
    (<HTMLInputElement>document.querySelectorAll('.city')[0]).value = city;
  }

  logout() {
    localStorage.clear();
  }
}
