import { Component, OnInit } from '@angular/core';
import { WebApiService } from './services/web-api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'pruebaPotter';
  characters = null;
  studentsGryffindor = [];
  studentsSlythering = [];
  studentsHufflepuff = [];
  studentsRavenclaw = [];
  displayedColumns: string[] = ['name', 'house', 'patronus'];
  dataSource = null;


  constructor(private webApi: WebApiService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const promise = this.webApi.fetchData();

    promise.then((data) => {
      this.characters = data;
      this.fillHouses(this.characters);
    }).catch((error) => {
    });
  }

  fillHouses(characters) {
    characters.forEach(character => {
      switch (character.house) {
        case "Gryffindor":
          this.studentsGryffindor.push(character);
          break;
        case "Slytherin":
          this.studentsSlythering.push(character);
          break;
        case "Hufflepuff":
          this.studentsHufflepuff.push(character);
          break;
        case "Ravenclaw":
          this.studentsRavenclaw.push(character);
          break;
        default:

      }
    });
  }

  getStudentsList(house) {
    switch (house) {
      case "Gryffindor":
        this.dataSource = this.studentsGryffindor;
        break;
      case "Slytherin":
        this.dataSource = this.studentsSlythering;
        break;
      case "Hufflepuff":
        this.dataSource = this.studentsHufflepuff;
        break;
      case "Ravenclaw":
        this.dataSource = this.studentsRavenclaw;
        break;
      default:
    }
  }
}

export interface Characters {
  name: string;
  house: string;
  patronus: string;
}
