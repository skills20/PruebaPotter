import { Component, OnInit, ViewChild } from '@angular/core';
import { WebApiService } from './services/web-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'pruebaPotter';
  characters = null;
  studentsGryffindor = new MatTableDataSource(String['']);
  studentsSlythering = new MatTableDataSource(String['']);
  studentsHufflepuff = new MatTableDataSource(String['']);
  studentsRavenclaw = new MatTableDataSource(String['']);
  displayedColumns: string[] = ['name', 'lastname', 'bloodstatus', 'house', 'patronus'];
  dataSource = new MatTableDataSource(String['']);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private webApi: WebApiService) { }

  ngOnInit() {
    this.fetchData();
    this.dataSource.sort = this.sort;
  }

  fetchData() {
    const promise = this.webApi.fetchData();

    promise.then((data) => {
      this.characters = data;
      this.characters = this.separateNames(this.characters);
      this.characters = this.bloodStatus(this.characters);
      this.fillHouses(this.characters);
    }).catch(error => "error my dog");
  }

  fillHouses(characters) {
    characters.forEach(character => {
      switch (character.house) {
        case "Gryffindor":
          this.studentsGryffindor.data.push(character);
          break;
        case "Slytherin":
          this.studentsSlythering.data.push(character);
          break;
        case "Hufflepuff":
          this.studentsHufflepuff.data.push(character);
          break;
        case "Ravenclaw":
          this.studentsRavenclaw.data.push(character);
          break;
        default:

      }
    });
  }

  bloodStatus(characters) {
    characters.forEach(character => {
      switch (character.bloodStatus) {
        case "pure-blood":
          character.color = "blue";
          break;
        case "half-blood":
          character.color = "green";
          break;
        case "muggle-born":
          character.color = "red";
          break;
        case "unknown":
          character.color = "gray";
          break;
        default:

      }
    });
    return (characters);
  }

  separateNames(characters) {
    characters.forEach(character => {
      let completeName = character.name.split(" ");
      if (completeName.length == 3) {
        character.name = `${completeName[0]} ${completeName[1]}`;
        character.lastname = completeName[2];
      } else {
        character.name = completeName[0];
        character.lastname = completeName[1]
      }
    });
    return (characters);
  }

  getStudentsList(house) {
    switch (house) {
      case "Gryffindor":
        this.dataSource = this.studentsGryffindor;
        this.dataSource.sort = this.sort;
        break;
      case "Slytherin":
        this.dataSource = this.studentsSlythering;
        this.dataSource.sort = this.sort;
        break;
      case "Hufflepuff":
        this.dataSource = this.studentsHufflepuff;
        this.dataSource.sort = this.sort;
        break;
      case "Ravenclaw":
        this.dataSource = this.studentsRavenclaw;
        this.dataSource.sort = this.sort;
        break;
      default:
    }
  }
}

export interface Characters {
  name: string;
  lastname: string;
  bloodstatus: string;
  house: string;
  patronus: string;
}

