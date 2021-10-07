import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/'
  baseMovieUrl = `${this.baseUrl}api/movies/`;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor( 
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getMovies(){
    return this.httpClient.get(this.baseMovieUrl, {headers: this.getAuthorization()});
  }

  getMovie(id: number){
    return this.httpClient.get(`${this.baseMovieUrl}${id}/`, {headers: this.getAuthorization()});
  }

  createMovie(title: string, description: string){
    const body = {title: title, description: description}
    return this.httpClient.post(`${this.baseMovieUrl}`, body, {headers: this.getAuthorization()});
  }
  updateMovie(id: any, title: string, description: string){
    const body = {title: title, description: description}
    return this.httpClient.put(`${this.baseMovieUrl}${id}/`, body, {headers: this.getAuthorization()});
  }

  deleteMovie(id: any){
    return this.httpClient.delete(`${this.baseMovieUrl}${id}/`, {headers: this.getAuthorization()});
  }
  rateMovie(rate: number, movieId: number){
    const body = {
      stars: rate
    }
    return this.httpClient.post(`${this.baseMovieUrl}${movieId}/rate_movie/`, body,  {headers: this.getAuthorization()});
  }

  loginUser(authData: any){
    const body = authData
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.headers} )
  }

  registerUser(authData: any){
    const body = authData
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers: this.headers} )
  
  }
  getAuthorization(){
  const token = this.cookieService.get('mr-token');
  console.log(token)
  return new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `token ${token}`
  });
  }
}

