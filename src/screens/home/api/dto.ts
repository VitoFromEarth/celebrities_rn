import Config from 'react-native-config';
import {ICelebrityListItem} from './interfaces.ts';
import {Department, Gender} from '../../../enums.ts';

export class Celebrity {
  public id: number;
  public name: string;
  public avatar: string;
  public gender: Gender;
  public department: Department;

  constructor(dataFromAPI: ICelebrityListItem) {
    this.id = dataFromAPI.id;
    this.name = dataFromAPI.name;
    this.gender = dataFromAPI.gender;
    this.avatar = `${Config.IMAGE_BASE_URL}${dataFromAPI.profile_path}`;
    this.department = dataFromAPI.known_for_department;
  }
}
