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

  constructor(private readonly http: HttpClient) {
    super(ApiUrls.LOGIN_ENDPOINT, http);
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.generateLink(), { email: email, password: password })
      .pipe(
        map((userInfo: any) => {
          const user = userInfo[1];
          user.token = userInfo[0].token;
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
        })
      );
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    return !!this.getCurrentUser;
  }
}
