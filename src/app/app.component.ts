import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'pruebaPotter';
  characters = null;
  key = "key=$2a$10$Q9NBGlw4eHGx9kr.ksEosOYmY.FCkUtoCBafK3.3aKauOG6HNraa6";
  api_url = `https://www.potterapi.com/v1/characters?${this.key}`;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const promise = this.http.get(this.api_url).toPromise();
    console.log(promise);

    promise.then((data) => {
      this.characters = data;
    }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }


}
