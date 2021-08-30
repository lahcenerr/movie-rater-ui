import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: any;
  rateHovered = 0;
  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
  }
  rateMovie(rate: any){
    this.rateHovered = rate;
  }
  rateClicked(rate: any){
    console.log(rate);
    this.apiService.rateMovie(rate, this.movie.id).subscribe(
      
    )
  }

}
