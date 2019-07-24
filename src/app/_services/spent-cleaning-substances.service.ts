import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../api-urls';
import { SpentCleaningSubstance } from '../_models';

@Injectable({ providedIn: 'root' })
export class SpentCleaningSubstancesService extends BaseCRUDService<SpentCleaningSubstance> {
    constructor(private readonly httpClient: HttpClient) {
        super(ApiUrls.SPENT_CLEANING_SUBSTANCES, httpClient);
    }
}
