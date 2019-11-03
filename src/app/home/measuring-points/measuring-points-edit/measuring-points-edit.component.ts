import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { EditContent } from '../../../_models/edit-content';
import { MeasuringPointsService } from '../../../_services/measuring-points.service';
import { River } from '../../../_models/river';
import { MeasuringPoint } from '../../../_models';
import { RiverSection } from '../../../_models/river-section';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RiverSectionsService } from 'src/app/_services/river-sections.service';
import { RiversService } from 'src/app/_services/rivers.service';

@Component({
  selector: 'app-measuring-points-edit',
  templateUrl: './measuring-points-edit.component.html',
  providers: [MessageService]
})
export class MeasuringPointsEditComponent extends EditContent<MeasuringPoint> {
  public rivers: River[];
  public riverSections: RiverSection[];
  public allRiverSections: RiverSection[];
  constructor(
    private readonly location: Location,
    private readonly measuringPointsService: MeasuringPointsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly modalService: BsModalService,
    private readonly riversService: RiversService,
    private readonly riverSectionsService: RiverSectionsService,
  ) {
    super(location, measuringPointsService, activatedRoute, messageService, modalService);
  }

  protected onComponentInit() {
    this.riversService.list().subscribe((rivers: River[]) => this.rivers = rivers);
    this.riverSectionsService.list().subscribe((riverSections: RiverSection[]) => {
      this.allRiverSections = riverSections;
      this.setNewRiverSections();
    });
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      x: [null, [Validators.required]],
      y: [null, [Validators.required]],
      river_id: [null, [Validators.required]],
      river_section_id: [null, [Validators.required]]
    });
  }

  setNewRiverSections() {
    const river_id: number = this.editForm.get('river_id').value;

    if (!river_id) {
      this.riverSections = this.allRiverSections;
      return;
    }

    this.riverSections = this.allRiverSections
      // tslint:disable-next-line:triple-equals
      .filter((riverSection: RiverSection) => riverSection.river_id == river_id);
  }

  protected beforeSubmit(): void { }
}
