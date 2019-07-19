import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../api-urls';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseCRUDService<User> {
    constructor(private readonly httpClient: HttpClient) {
        super(ApiUrls.USERS_ENDPOINT, httpClient);
    }
}
