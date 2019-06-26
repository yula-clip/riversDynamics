import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { BaseCRUDService } from './base-crud.service';
import { ApiUrls } from '../api-urls';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseCRUDService<User> {
    private readonly currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private readonly http: HttpClient) {
        super(ApiUrls.LOGIN_ENDPOINT, http);
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public login(username: string, password: string): Observable<User> {
        return this.http.post<any>(this.generateLink(), { password, username })
            .pipe(map(user => {
                if (user && user.token) {
                    const authHeader = `Bearer ${user.token}`;
                    sessionStorage.setItem('authHeader', authHeader);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                }
            }));
    }

    public logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
