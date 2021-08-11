import { CompileMetadataResolver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  
  movies: any = [];

  constructor(private apiService: ApiService) 
    { }
  
  ngOnInit(){
    this.apiService.getMovies().subscribe(
      (data) => {
        this.movies = data;
      },
      error => console.log(error)
    );

     }

}
