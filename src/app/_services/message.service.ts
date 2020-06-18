import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  instrumentsNames: Array<string> = ['Gitara elektryczna', 'Gitara basowa', 'Perkusja', 'Klawisze', 'Wokal'];
  bandsNames: Array<string> = ['Wesela', 'Zabawy', 'Koncerty', 'Granie Niekomercyjne'];
  citiesNames: Array<string> = ['Warszawa', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Katowice', 'Gdynia', 'Częstochowa', 'Radom', 'Rzeszów'];
}
