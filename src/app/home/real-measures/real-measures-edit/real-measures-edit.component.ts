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
import { SubstancesService } from 'src/app/_services/substances.service';
import { MeasuringPointsService } from 'src/app/_services/measuring-points.service';
import * as moment from 'moment';

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
    private readonly modalService: BsModalService,
    private readonly substancesService: SubstancesService,
    private readonly measuringPointsService: MeasuringPointsService
  ) {
    super(location, realMeasuresService, activatedRoute, messageService, modalService);
    this.sourceMeasuringPoints = [];
  }

  protected onComponentInit() {
    this.substancesService.list().subscribe((substances: Substance[]) => this.substances = substances);
    this.measuringPointsService.list().subscribe((measuringPoints: MeasuringPoint[]) =>
      this.sourceMeasuringPoints = measuringPoints);

    library.add(faPencilAlt);
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      date: [null, Validators.required],
      measuring_points: [null, Validators.required],
      substance: [null, Validators.required],
      substance_id: [null],
      value: [null, Validators.required],
    });
  }

  protected onEditScreenOpened(realMeasure: RealMeasure) {
    // console.log(this.editForm.get('date').value);
    // if (realMeasure.date) {
    //   // real
    // }
    if (realMeasure.measuring_points) {
      realMeasure.measuring_points.forEach((measuringPoint: MeasuringPoint) => {
        this.sourceMeasuringPoints = this.sourceMeasuringPoints
          .filter((sourceMeasuringPoint: any) => sourceMeasuringPoint.id !== measuringPoint.id);
      });
    }
  }

  compareSubstances(substanceFromList: Substance, substance: Substance): boolean {
    return substanceFromList && substance
      ? substanceFromList.id === substance.id
      : substanceFromList === substance;
  }

  public convertDate(dateTime: Date): Date {
   const date = moment(dateTime).format('DD/MM/YYYY');
    return moment(date).toDate();
  }

  protected beforeSubmit(): void {
    this.editForm.get('substance_id').setValue(this.editForm.get('substance').value.id);
    const measuring_points = this.editForm.get('measuring_points').value.map(i => i.id);
    this.editForm.get('measuring_points').setValue(measuring_points);

    const date = this.convertDate(this.editForm.get('date').value);
    this.editForm.get('date').setValue(date);
  }
}
