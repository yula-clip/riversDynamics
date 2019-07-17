import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { EditContent } from '../../../_models/edit-content';
import { MeasuringPointsService } from '../../../_services/measuring-points.service';
import { River } from 'src/app/_models/river';
import { MeasuringPoint } from 'src/app/_models';
import { RiverSection } from 'src/app/_models/river-section';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-measuring-points-edit',
  templateUrl: './measuring-points-edit.component.html',
  providers: [MessageService]
})
export class MeasuringPointsEditComponent extends EditContent<MeasuringPoint> {
  public rivers: River[];
  public riverSections: RiverSection[];
  constructor(
    private readonly location: Location,
    private readonly riversService: MeasuringPointsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly modalService: BsModalService
  ) {
    super(location, MeasuringPointsService, activatedRoute, messageService, modalService);
  }

  protected onComponentInit() {
    this.rivers = [new River(1, 'Прут'), new River(2, 'Дніпро'),
    new River(3, 'Сірет'), new River(4, 'Дністер')];

    this.riverSections = [new RiverSection(1, 'Ділянка Прут'), new RiverSection(2, 'Ділянка Дніпро'),
    new RiverSection(3, 'Ділянка Сірет'), new RiverSection(4, 'Ділянка Дністер')];
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      x: [null, [Validators.required]],
      y: [null, [Validators.required]],
      river: [null, [Validators.required]],
      riverSection: [null, [Validators.required]],
    });
  }

  protected beforeSubmit(): void { }
}
