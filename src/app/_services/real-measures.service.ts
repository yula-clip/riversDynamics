import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../api-urls';
import { RealMeasure } from '../_models';

@Injectable({ providedIn: 'root' })
export class RealMeasuresService extends BaseCRUDService<RealMeasure> {
    constructor(private readonly httpClient: HttpClient) {
        super(ApiUrls.REAL_MEASURE_ENDPOINT, httpClient);
    }
}
