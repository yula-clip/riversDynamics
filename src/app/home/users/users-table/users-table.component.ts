import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableContent } from '../../../_models/table-content';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  providers: [MessageService]
})
export class UsersTableComponent extends TableContent<User> {
  public users: User[];
  constructor(
    private readonly usersService: UsersService,
    private readonly modalService: BsModalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super(UsersService, modalService, router, activatedRoute);
  }

  protected onComponentInit() {
    library.add(faPlus);
    // this.getItems();
    this.users = [new User(1, 'User1'), new User(2, 'User2'),
    new User(3, 'User3'), new User(4, 'User4')];
  }

  public setItems(_users: User[]) {
    this.users = _users;
  }
}
