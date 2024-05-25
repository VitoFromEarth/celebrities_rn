import {api, IResponse} from '../../../infrastructure/api/client.ts';
import {ICelebritiesResponse} from './interfaces.ts';
import {Celebrity} from './dto.ts';

export interface ICelebritiesListRepository {
  getList(page: number): Promise<Celebrity[]>;
}

export class CelebritiesListRepository implements ICelebritiesListRepository {
  public async getList(page: number): Promise<Celebrity[]> {
    try {
      const response: IResponse<ICelebritiesResponse> =
        await api.get<ICelebritiesResponse>('person/popular', {}, {page});
      if (!response.data || response.errorMessage) {
        // TODO: Add message notification??
        return [];
      }
      return response.data.results.map(celebrity => new Celebrity(celebrity));
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
