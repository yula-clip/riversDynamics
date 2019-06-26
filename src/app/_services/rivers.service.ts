import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../api-urls';
import { River } from '../_models/river';

@Injectable({ providedIn: 'root' })
export class RiversService extends BaseCRUDService<River> {
    constructor(private readonly httpClient: HttpClient) {
        super(ApiUrls.RIVERS_ENDPOINT, httpClient);
    }
}
