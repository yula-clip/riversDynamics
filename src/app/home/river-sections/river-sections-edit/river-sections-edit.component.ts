import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { EditContent } from '../../../_models/edit-content';
import { RiverSection } from '../../../_models/river-section';
import { RiverSectionsService } from '../../../_services/river-sections.service';
import { River } from '../../../_models/river';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RiversService } from 'src/app/_services/rivers.service';

@Component({
  selector: 'app-river-sections-edit',
  templateUrl: './river-sections-edit.component.html',
  providers: [MessageService]
})
export class RiverSectionsEditComponent extends EditContent<RiverSection> {
  public rivers: River[];
  constructor(
    private readonly location: Location,
    private readonly riverSectionsService: RiverSectionsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly modalService: BsModalService,
    private readonly riversService: RiversService,
  ) {
    super(location, riverSectionsService, activatedRoute, messageService, modalService);
  }

  protected onComponentInit() {
    this.riversService.list().subscribe((rivers: River[]) => this.rivers = rivers);
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      river_id: [null, [Validators.required]],
      diffuse: [null, [Validators.required]],
    });
  }

  protected beforeSubmit(): void { }
}
