import {Celebrity} from './dto.ts';
import {api, IResponse} from '../../../infrastructure/api/client.ts';
import {ICelebrityResponse} from './interfaces.ts';

export interface ICelebrityDetailsRepository {
  getCelebrityById: (id: number) => Promise<Celebrity | undefined>;
}

export class CelebrityDetailsRepository implements ICelebrityDetailsRepository {
  public async getCelebrityById(id: number): Promise<Celebrity | undefined> {
    try {
      const response: IResponse<ICelebrityResponse> =
        await api.get<ICelebrityResponse>(
          `person/${id}`,
          {},
          {append_to_response: 'movie_credits'},
        );
      return new Celebrity(response.data!);
    } catch (error) {}
  }
}
