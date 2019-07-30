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
import { isNull } from 'util';

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

    this.allRiverSections = [
      { id: 1, name: 'Ділянка Прут1', river: new River(1, 'Прут'), diffuse: 5 },
      { id: 1, name: 'Ділянка Прут2', river: new River(1, 'Прут'), diffuse: 5 },
      { id: 2, name: 'Ділянка Дніпро1', river: new River(2, 'Дніпро'), diffuse: 5 },
      { id: 2, name: 'Ділянка Дніпро2', river: new River(2, 'Дніпро'), diffuse: 5 },
      { id: 2, name: 'Ділянка Дніпро3', river: new River(2, 'Дніпро'), diffuse: 5 },
      { id: 3, name: 'Ділянка Сірет', river: new River(3, 'Сірет'), diffuse: 5 },
      { id: 4, name: 'Ділянка Дністер1', river: new River(4, 'Дністер'), diffuse: 5 },
      { id: 4, name: 'Ділянка Дністер2', river: new River(4, 'Дністер'), diffuse: 5 }
    ];
    this.riverSections = this.allRiverSections;
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      x: [null, [Validators.required]],
      y: [null, [Validators.required]],
      river: [null, [Validators.required]],
      riverSection: [null, [Validators.required]]
    });
  }

  setNewRiverSections() {
    const river: River = this.editForm.get('river').value;

    if (!river.id || !river) {
      this.riverSections = this.allRiverSections;
      return;
    }
    this.riverSections = this.allRiverSections
      .filter((riverSection: RiverSection) => riverSection.river.id === river.id);
  }

  protected beforeSubmit(): void { }
}
