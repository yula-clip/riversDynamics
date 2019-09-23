import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [MessageService]
})

export class HomeComponent implements OnInit {
  public currentUserName: string;

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly messageService: MessageService
  ) { }

  ngOnInit() {
    library.add(faUserCircle);
    this.currentUserName = this.authenticationService.getCurrentUser.name;

  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add(
      {
        key: 'riverWarn', sticky: true, severity: 'warn', summary: 'Зверніть увагу!',
        detail: 'Рівень забрудняння на певній ділянці річки перевищує норму.'
      }
    );
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
