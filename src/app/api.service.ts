import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/api/movies/';
  headers = new HttpHeaders({
    Authorization: "token 4c79ee2c0c2f944d0b00e7d3d0eb959f29939a32"
  });

  constructor( private httpClient: HttpClient) { }

  getMovies(){
  
    return this.httpClient.get(this.baseUrl, {headers: this.headers});
  }
}
