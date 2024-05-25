import {makeAutoObservable, runInAction} from 'mobx';
import {Celebrity} from './api/dto.ts';
import {CelebritiesListRepository} from './api/repository.ts';

class CelebritiesListService {
  public celebrities: Celebrity[] = [];
  public likedCelebritiesIds: number[] = [];
  public loading: boolean = false;
  private _repository: CelebritiesListRepository =
    new CelebritiesListRepository();

  constructor() {
    makeAutoObservable(this);
  }

  public async getCelebrities() {
    try {
      this.loading = true;
      const celebritiesResponse = await Promise.all(
        this._composeCelebritiesRequest(),
      );
      runInAction(() => {
        this.celebrities = celebritiesResponse.flat();
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

  private _composeCelebritiesRequest(): Promise<Celebrity[]>[] {
    let requests: Promise<Celebrity[]>[] = [];
    for (let i = 1; i <= 25; i++) {
      requests.push(this._repository.getList(i));
    }

    return requests;
  }
}

export const celebritiesListService = new CelebritiesListService();
