import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { EditContent } from '../../../_models/edit-content';
import { Substance } from '../../../_models/substance';
import { SubstancesService } from '../../../_services/substances.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-substances-edit',
  templateUrl: './substances-edit.component.html',
  providers: [MessageService]
})
export class SubstancesEditComponent extends EditContent<Substance> {
  constructor(
    private readonly location: Location,
    private readonly substancesService: SubstancesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly modalService: BsModalService
  ) {
    super(location, substancesService, activatedRoute, messageService, modalService);
  }

  protected onComponentInit() {

  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      latinName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      coefficient1: [null, [Validators.required]],
      coefficient2: [null, [Validators.required]],
      coefficient3: [null, [Validators.required]],
      unitsOfMeasurement: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      validValues: [null, [Validators.required]],
      status: [false, [Validators.required]],
    });
  }

  protected beforeSubmit(): void {
    console.log(this.editForm);
  }
}
