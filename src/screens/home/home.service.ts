import {computed, makeAutoObservable, runInAction} from 'mobx';
import {Celebrity} from './api/dto.ts';
import {CelebritiesListRepository} from './api/repository.ts';
import {Department, Gender} from './api/interfaces.ts';

interface ILikedDisliked {
  liked: boolean;
  disliked: boolean;
}

class CelebritiesListService {
  public likedCelebritiesIds: number[] = [];
  public loading: boolean = false;
  private _searchFilter: string = '';
  private _selectedGenders: Gender[] = [];
  private _selectedDepartments: Department[] = [];
  private _selectedLikedDisliked: ILikedDisliked = {
    liked: false,
    disliked: false,
  };
  private _celebrities: Celebrity[] = [];
  private _repository: CelebritiesListRepository =
    new CelebritiesListRepository();

  constructor() {
    makeAutoObservable(this, {
      filteredCelebrities: computed,
    });
  }

  public get filteredCelebrities() {
    let tempCelebs = [...this._celebrities];

    if (this._searchFilter.length) {
      tempCelebs = tempCelebs.filter(celebrity =>
        celebrity.name.toLowerCase().includes(this._searchFilter.toLowerCase()),
      );
    }

    if (this._selectedGenders.length) {
      tempCelebs = tempCelebs.filter(celebrity =>
        this._selectedGenders.includes(celebrity.gender),
      );
    }

    if (this._selectedDepartments.length) {
      tempCelebs = tempCelebs.filter(celebrity =>
        this._selectedDepartments.includes(celebrity.department),
      );
    }

    if (
      this._selectedLikedDisliked.liked &&
      !this._selectedLikedDisliked.disliked
    ) {
      tempCelebs = tempCelebs.filter(celebrity =>
        this.likedCelebritiesIds.includes(celebrity.id),
      );
    } else if (
      !this._selectedLikedDisliked.liked &&
      this._selectedLikedDisliked.disliked
    ) {
      tempCelebs = tempCelebs.filter(
        celebrity => !this.likedCelebritiesIds.includes(celebrity.id),
      );
    }

    return tempCelebs;
  }

  public async getCelebrities() {
    try {
      this.loading = true;
      const celebritiesResponse = await Promise.all(
        this._composeCelebritiesRequest(),
      );
      runInAction(() => {
        this._celebrities = celebritiesResponse.flat();
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      // TODO: Show message
    }
  }

  public toggleCelebrityLike(id: number, like: boolean) {
    if (like && !this.likedCelebritiesIds.find(celebId => celebId === id)) {
      this.likedCelebritiesIds = [...this.likedCelebritiesIds, id];
    } else if (!like) {
      this.likedCelebritiesIds = this.likedCelebritiesIds.filter(
        celebId => celebId !== id,
      );
    }
  }

  public searchCelebrities(search: string): void {
    this._searchFilter = search;
  }

  public filterByDepartment(department: Department): void {
    if (!this._selectedDepartments.find(dep => dep === department)) {
      this._selectedDepartments = [...this._selectedDepartments, department];
    } else {
      this._selectedDepartments = this._selectedDepartments.filter(
        dep => dep !== department,
      );
    }
  }

  public filterByGender(gender: Gender): void {
    if (!this._selectedGenders.find(gend => gend === gender)) {
      this._selectedGenders = [...this._selectedGenders, gender];
    } else {
      this._selectedGenders = this._selectedGenders.filter(
        gend => gend !== gender,
      );
    }
  }

  public filterByLikedDisliked(likedDisliked: Partial<ILikedDisliked>): void {
    this._selectedLikedDisliked = {
      ...this._selectedLikedDisliked,
      ...likedDisliked,
    };
  }

  public isInSelectedDepartment(department: Department): boolean {
    return !!this._selectedDepartments.find(dep => dep === department);
  }

  public isInSelectedGender(gender: Gender): boolean {
    return !!this._selectedGenders.find(gend => gend === gender);
  }

  private _composeCelebritiesRequest(): Promise<Celebrity[]>[] {
    let requests: Promise<Celebrity[]>[] = [];
    for (let i = 1; i <= 25; i++) {
      requests.push(this._repository.getList(i));
    }

    return requests;
  }
}

export const celebritiesListService = new CelebritiesListService();
