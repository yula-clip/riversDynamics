import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { EditContent } from '../../../_models/edit-content';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  providers: [MessageService]
})
export class UsersEditComponent extends EditContent<User> {
  constructor(
    private readonly location: Location,
    private readonly usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly modalService: BsModalService
  ) {
    super(location, UsersService, activatedRoute, messageService, modalService);
  }

  protected onComponentInit() {
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      isAdmin: [false],
    });
  }

  protected beforeSubmit(): void {
    console.log(this.editForm);
   }
}
