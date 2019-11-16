import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../api-urls';
import { AbstractEntity } from '../_models/abstract-entity';

export abstract class BaseCRUDService<T extends AbstractEntity> {
  constructor(private readonly _pageUrl: string, private readonly _httpClient: HttpClient) { }

  protected generateLink() {
    return `${ApiUrls.API_ENDPOINT}/${this._pageUrl}`;
  }

  public list(): Observable<T[]> {
    return this._httpClient.get<T[]>(this.generateLink());
  }

  public getById(id: number): Observable<T> {
      return this._httpClient.get<T>(`${this.generateLinkWithId(id)}`);
  }

  public create(entity: T): Observable<T> {
    return this._httpClient.post<T>(this.generateLink(), entity);
  }

  public update(entity: T): Observable<T> {
    return this._httpClient.put<T>(`${this.generateLinkWithId(entity.id)}`, entity);
  }

  public delete(id: number): Observable<{}> {
      return this._httpClient.delete(`${this.generateLinkWithId(id)}`);
  }

  protected generateLinkWithId(id: number): string {
    return `${this.generateLink()}/${id}`;
  }
}
