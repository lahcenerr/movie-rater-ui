import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  
  @Input() movies: any;
  @Output() selectedMovie = new EventEmitter();
  display = 'none';
  editAdd = "";
  id = null;
  movieForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
    });
  

  constructor( private apiServise: ApiService) 
    { }
  
  ngOnInit(){
      console.log(this.movies)
     }
  movieClicked(movie: any){
    this.selectedMovie.emit(movie);
  }

  editMovie(movie: any){
    this.id = movie.id;
    this.display = 'block';
    this.editAdd = "Edit Movie"
    this.movieForm.controls.title.setValue(movie.title);
    this.movieForm.controls.description.setValue(movie.description);
  }

  newMovie(){
    this.movieForm.reset()
    this.display = 'block';
    this.editAdd = "New Movie";
  }
  deleteMovie(movie: any){
    var result = confirm("Are you sure you want to delete?");
    if (result) {
      this.apiServise.deleteMovie(movie.id).subscribe(
        result => {console.log("Success"),
        this.movies = this.movies.filter((mov: any)=> mov.id != movie.id);
      },
        error => console.log(error)
      );
}
  }
  
  openModal(){
    this.display='block';
 }

 onCloseHandled(){
  this.display='none';
}
saveForm(){
  if (this.editAdd == "New Movie"){
  this.apiServise.createMovie(this.movieForm.value.title,
    this.movieForm.value.description).subscribe(
      (result) => {
        this.movies.push(result);
        this.display = 'none'
      },
      (error) => {console.log(error);
        this.display = 'none'
        }    );
    } else {
        this.apiServise.updateMovie(this.id, this.movieForm.value.title,
          this.movieForm.value.description).subscribe(
            (result) => {
              const movieIndex = this.movies.findIndex((mov: any) => mov.id == this.id);
              this.movies[movieIndex] = result;
              this.display = 'none'
            },
            (error) => {console.log(error);
            this.display = 'none'
            }
          );
    }
}
}
