import {computed, makeAutoObservable, runInAction} from 'mobx';
import {Celebrity} from './api/dto.ts';
import {CelebritiesListRepository} from './api/repository.ts';

class CelebritiesListService {
  public likedCelebritiesIds: number[] = [];
  public loading: boolean = false;
  private _searchFilter: string = '';
  private _celebrities: Celebrity[] = [];
  private _repository: CelebritiesListRepository =
    new CelebritiesListRepository();

  constructor() {
    makeAutoObservable(this, {
      filteredCelebrities: computed,
    });
  }

  public get filteredCelebrities() {
    if (this._searchFilter.length) {
      return this._celebrities.filter(celebrity =>
        celebrity.name.toLowerCase().includes(this._searchFilter.toLowerCase()),
      );
    }

    return this._celebrities;
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

  private _composeCelebritiesRequest(): Promise<Celebrity[]>[] {
    let requests: Promise<Celebrity[]>[] = [];
    for (let i = 1; i <= 25; i++) {
      requests.push(this._repository.getList(i));
    }

    return requests;
  }
}

export const celebritiesListService = new CelebritiesListService();
