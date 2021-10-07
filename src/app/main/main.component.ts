import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies: any;
  selectedMovie = null;
  constructor(
    private apiService: ApiService, 
    private router: Router,
    private cookieService: CookieService  ) { }

  ngOnInit() {
    const mrToken  = this.cookieService.get("mr-token")
    if (mrToken){
    this.apiService.getMovies().subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.log(error);
      }
    );
    }
    else {
      this.router.navigateByUrl('/auth');
    }
  }
  selectMovie(movie: any){
    this.selectedMovie = movie;
  }

  logoff(){
    this.cookieService.delete("mr-token");
    this.router.navigateByUrl('/auth');
  }

}
