import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MessageService } from 'primeng/components/common/messageservice';
import { RealMeasuresService } from '../_services/real-measures.service';
import { RealMeasure, User } from '../_models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersService } from '../_services/users.service';
import { ApiUrls } from '../api-urls';
import { SharedPollutedSectionService } from '../_services/sharedPollutedSectionService';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [MessageService, SharedPollutedSectionService]
})

export class HomeComponent implements OnInit {
  currentUserName: string;
  currentUser: User;
  measures: any[];
  modalRef: BsModalRef;
  password: any;

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly messageService: MessageService,
    private readonly realMeasuresService: RealMeasuresService,
    private readonly modalService: BsModalService,
    private readonly usersService: UsersService,
    private readonly sharedPollutedSection: SharedPollutedSectionService
  ) { }

  ngOnInit() {
    library.add(faUserCircle);
    this.currentUserName = this.authenticationService.getCurrentUser.name;
    this.currentUser = this.authenticationService.getCurrentUser;
    this.getPollutedSectionMessages();
  }

  getPollutedSectionMessages() {
    this.realMeasuresService.getPollutedSection().subscribe((measures: RealMeasure[]) => {
      this.measures = measures;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add(
      {
        key: `riverWarn`, sticky: true, severity: 'warn', summary: 'Зверніть увагу!',
        detail: 'Рівень забрудняння на певних ділянка перевищує норму.'
      }
    );
  }

  onConfirm(riverId: number, sectionId: number) {
    this.clear();
    this.sharedPollutedSection.setSection({ riverId, sectionId });
    this.router.navigate([`/${ApiUrls.RESEARCH_ENDPOINT}`]);
  }

  clear() {
    this.messageService.clear();
  }

  changePass() {
    if (this.password) {
      this.currentUser.password = this.password;
      this.usersService.update(this.currentUser).subscribe(() => {
        this.modalRef.hide();
        this.messageService.add(
          {
            severity: 'info', summary: 'Пароль успішно змінено'
          }
        );
      });
    }
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
