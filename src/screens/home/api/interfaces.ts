import {Department, Gender} from '../../../enums.ts';

export interface KnownForMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ICelebrityListItem {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for: KnownForMovie[];
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface ICelebritiesResponse {
  page: number;
  results: ICelebrityListItem[];
  total_pages: number;
  total_results: number;
}
