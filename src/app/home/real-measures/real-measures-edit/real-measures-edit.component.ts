import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { EditContent } from '../../../_models/edit-content';
import { RealMeasure } from '../../../_models/real-measure';
import { RealMeasuresService } from '../../../_services/real-measures.service';
import { MeasuringPoint, Substance } from '../../../_models';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-real-measures-edit',
  templateUrl: './real-measures-edit.component.html',
  providers: [MessageService]
})
export class RealMeasuresEditComponent extends EditContent<RealMeasure> {
  public sourceMeasuringPoints: MeasuringPoint[];
  public substances: Substance[];

  constructor(
    private readonly location: Location,
    private readonly realMeasuresService: RealMeasuresService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly modalService: BsModalService

  ) {
    super(location, realMeasuresService, activatedRoute, messageService, modalService);
  }

  protected onComponentInit() {
    this.substances = [new Substance(1, 'Прут'), new Substance(2, 'Дніпро'),
    new Substance(3, 'Сірет'), new Substance(4, 'Дністер')];
    library.add(faPencilAlt);
    this.sourceMeasuringPoints = [new MeasuringPoint(1, 'Measuring point1'),
    new MeasuringPoint(2, 'Measuring point2'), new MeasuringPoint(3, 'Measuring point3')];
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      date: [null, [Validators.required]],
      measuringPoints: [null, [Validators.required]],
      substance: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });
  }

  protected onEditScreenOpened(realMeasure: RealMeasure) {
    realMeasure.measuringPoints = [new MeasuringPoint(1, 'Measuring point1')];
    realMeasure.measuringPoints.forEach((measuringPoint: MeasuringPoint) => {
      this.sourceMeasuringPoints = this.sourceMeasuringPoints
        .filter((sourceMeasuringPoint: any) => sourceMeasuringPoint.id !== measuringPoint.id);
    });
  }

  protected beforeSubmit(): void {
    console.log(this.editForm);
  }
}
