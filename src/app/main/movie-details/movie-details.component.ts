import { Component, Input,Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Movie } from 'src/app/models/movie';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: any;
  @Output() updatedMovie = new EventEmitter();
  rateHovered = 0;
  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
  }
  rateMovie(rate: number){
    this.rateHovered = rate;
  }
  rateClicked(rate: number){
    console.log(rate);
    this.apiService.rateMovie(rate, this.movie.id).subscribe(
      result => this.getDetails(),
      error => console.log(error)
    );
  }

  getDetails(){
    this.apiService.getMovie(this.movie.id).subscribe(
      movie => {
        this.updatedMovie.emit(movie);
      },
      error => console.log(error)
      );
  }

}
