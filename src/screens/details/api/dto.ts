import Config from 'react-native-config';
import {ICelebrityResponse, IMovie} from './interfaces.ts';

export class Celebrity {
  public id: number;
  public name: string;
  public avatar: string;
  public movies: Movie[];

  constructor(dataFromAPI: ICelebrityResponse) {
    this.id = dataFromAPI.id;
    this.name = dataFromAPI.name;
    this.avatar = `${Config.IMAGE_BASE_URL}${dataFromAPI.profile_path}`;
    this.movies = dataFromAPI.movie_credits.cast.map(movie => new Movie(movie));
  }
}

export class Movie {
  public id: number;
  public title: string;
  public cover: string;
  public overview: string;
  public releaseDate: string;

  constructor(dataFromAPI: IMovie) {
    this.id = dataFromAPI.id;
    this.overview = dataFromAPI.overview;
    this.releaseDate = dataFromAPI.release_date;
    this.title = dataFromAPI.title;
    this.cover = `${Config.IMAGE_BASE_URL}${dataFromAPI.backdrop_path}`;
  }
}
