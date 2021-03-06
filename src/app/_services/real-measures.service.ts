import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../api-urls';
import { RealMeasure } from '../_models';
import { Observable } from 'rxjs';
import { map, repeat, retry, catchError, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RealMeasuresService extends BaseCRUDService<RealMeasure> {
  constructor(private readonly httpClient: HttpClient) {
    super(ApiUrls.REAL_MEASURES_ENDPOINT, httpClient);
  }

  public getBySubstanceId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.generateLinkWithId(id)}/sectionId`);
  }

  public getPollutedSection(): Observable<any> {
    return this.httpClient.get<any>(`${this.generateLink()}/polluted`)
      .pipe(
        delay(6000),
        repeat()
      );
  }

  public getResults(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.generateLinkWithId(id)}/results`);
  }

  public importMeas(file: any): Observable<any> {
    return this.httpClient.post<any>(`${this.generateLink()}/import`, file);
  }
}
