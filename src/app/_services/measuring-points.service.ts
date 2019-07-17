import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../api-urls';
import { MeasuringPoint } from '../_models/measuring-point';

@Injectable({ providedIn: 'root' })
export class MeasuringPointsService extends BaseCRUDService<MeasuringPoint> {
    constructor(private readonly httpClient: HttpClient) {
        super(ApiUrls.MEASURING_POINTS_ENDPOINT, httpClient);
    }
}
