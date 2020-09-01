import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  key = "key=$2a$10$Q9NBGlw4eHGx9kr.ksEosOYmY.FCkUtoCBafK3.3aKauOG6HNraa6";
  api_url = `https://www.potterapi.com/v1/characters?${this.key}`;

  constructor(private http: HttpClient) { }

  fetchData() {
    const promise = this.http.get(this.api_url).toPromise();
    return (promise);
  }
}
