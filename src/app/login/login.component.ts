import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean;
  private submitted: boolean;
  private isError: boolean;
  private returnUrl: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    library.add(faUser, faLock);
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private get editFrom() { return this.loginForm.controls; }

  public onSubmit() {
    this.submitted = true;
    this.isError = false;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.editFrom.email.value, this.editFrom.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        () => {
          this.isError = true;
          this.loading = false;
        });
  }

  public formHasError(formControlName: string) {
    return this.submitted && (this.editFrom[formControlName].errors || this.isError);
  }
}
