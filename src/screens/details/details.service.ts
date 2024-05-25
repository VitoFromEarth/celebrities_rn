import {Celebrity} from './api/dto.ts';
import {makeAutoObservable, runInAction} from 'mobx';
import {CelebrityDetailsRepository} from './api/repository.ts';

class CelebrityDetailsService {
  public celebrity: Celebrity | undefined;
  public loading: boolean = false;
  private _repository: CelebrityDetailsRepository =
    new CelebrityDetailsRepository();

  constructor() {
    makeAutoObservable(this);
  }

  public async getCelebrityDetailsBy(id: number): Promise<void> {
    try {
      this.loading = true;
      const response: Celebrity | undefined =
        await this._repository.getCelebrityById(id);

      runInAction(() => {
        if (response) {
          this.celebrity = response;
        }
        this.loading = false;
      });
    } catch (err) {
      this.loading = false;
    }
  }
}

export const celebrityDetailsService = new CelebrityDetailsService();
