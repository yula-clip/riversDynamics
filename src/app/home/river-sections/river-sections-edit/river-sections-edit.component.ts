import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { EditContent } from '../../../_models/edit-content';
import { RiverSection } from '../../../_models/river-section';
import { RiverSectionsService } from '../../../_services/river-sections.service';

@Component({
  selector: 'app-river-sections-edit',
  templateUrl: './river-sections-edit.component.html',
  providers: [MessageService]
})
export class RiverSectionsEditComponent extends EditContent<RiverSection> {
  constructor(
    private readonly location: Location,
    private readonly riversService: RiverSectionsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService
  ) {
    super(location, RiverSectionsService, activatedRoute, messageService);
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
