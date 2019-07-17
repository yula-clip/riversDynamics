import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../api-urls';
import { Substance } from '../_models';

@Injectable({ providedIn: 'root' })
export class SubstancesService extends BaseCRUDService<Substance> {
    constructor(private readonly httpClient: HttpClient) {
        super(ApiUrls.SUBSTANCE_ENDPOINT, httpClient);
    }
}
