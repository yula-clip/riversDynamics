import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { EditContent } from '../../../_models/edit-content';
import { River } from '../../../_models/river';
import { RiversService } from '../../../_services/rivers.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-rivers-edit',
  templateUrl: './rivers-edit.component.html',
  providers: [MessageService]
})
export class RiversEditComponent extends EditContent<River> {
  constructor(
    private readonly location: Location,
    private readonly riversService: RiversService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly modalService: BsModalService
  ) {
    super(location, riversService, activatedRoute, messageService, modalService);
  }

  protected onComponentInit() {
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
    });
  }

  protected beforeSubmit(): void { }
}
