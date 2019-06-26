import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../api-urls';
import { RiverSection } from '../_models/river-section';

@Injectable({ providedIn: 'root' })
export class RiverSectionsService extends BaseCRUDService<RiverSection> {
    constructor(private readonly httpClient: HttpClient) {
        super(ApiUrls.RIVER_SECTIONS_ENDPOINT, httpClient);
    }
}
