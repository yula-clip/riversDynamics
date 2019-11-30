import { Component, ViewChild } from '@angular/core';
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
import { River } from 'src/app/_models/river';
import { RiverSection } from 'src/app/_models/river-section';
import { RiverSectionsService } from 'src/app/_services/river-sections.service';
import { RiversService } from 'src/app/_services/rivers.service';

@Component({
  selector: 'app-real-measures-edit',
  templateUrl: './real-measures-edit.component.html',
  providers: [MessageService]
})
export class RealMeasuresEditComponent extends EditContent<RealMeasure> {
  public measuringPoints: MeasuringPoint[];
  public substances: Substance[];
  rivers: River[];
  riverSections: RiverSection[];
  allMeasuringPoints: MeasuringPoint[];
  allRiverSections: RiverSection[];
  selectRiverId: number;
  selectRiverSectionId: number;
  @ViewChild('riverSelect') riverSelect: any;
  @ViewChild('riverSectionSelect') riverSectionSelect: any;

  constructor(
    private readonly location: Location,
    private readonly realMeasuresService: RealMeasuresService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly modalService: BsModalService,
    private readonly substancesService: SubstancesService,
    private readonly measuringPointsService: MeasuringPointsService,
    private readonly riverSectionsService: RiverSectionsService,
    private readonly riversService: RiversService
  ) {
    super(location, realMeasuresService, activatedRoute, messageService, modalService);
    this.measuringPoints = [];
  }

  protected onComponentInit() {

    this.riversService.list().subscribe((rivers: River[]) => this.rivers = rivers);
    this.riverSectionsService.list().subscribe((riverSections: RiverSection[]) => {
      this.riverSections = riverSections;
      this.allRiverSections = riverSections;
    });
    this.substancesService.list().subscribe((substances: Substance[]) => this.substances = substances);
    this.measuringPointsService.list().subscribe((measuringPoints: MeasuringPoint[]) => {
      this.measuringPoints = measuringPoints;
      this.allMeasuringPoints = this.measuringPoints;
    });

    library.add(faPencilAlt);
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      date: [null, Validators.required],
      measuring_point: [null, Validators.required],
      measPointId: [null],
      substance: [null, Validators.required],
      substId: [null],
      value: [null, Validators.required],
    });
  }

  compareById(itemFromList: any, item: any): boolean {
    return itemFromList && item
      ? itemFromList.id === item.id
      : itemFromList === item;
  }

  protected beforeSubmit(): void {
    this.editForm.get('substId').setValue(this.editForm.get('substance').value.id);
    this.editForm.get('measPointId').setValue(this.editForm.get('measuring_point').value.id);
  }

  setNewRiverSections(event: any) {
    this.selectRiverId = event.target.value;

    this.riverSections = this.allRiverSections
      // tslint:disable-next-line:triple-equals
      .filter((riverSection: RiverSection) => riverSection.river_id == this.selectRiverId);
  }

  onChangeRiverSections(event: any) {
    this.selectRiverSectionId = event.target.value;
    this.measuringPoints = this.allMeasuringPoints.filter((point: MeasuringPoint) =>
      // tslint:disable-next-line:triple-equals
      point.river_section_id == this.selectRiverSectionId);
  }

  onEditScreenOpened(item: RealMeasure) {
    const river_id = item.measuring_point.river_section.river_id;
    const river_section_id = item.measuring_point.river_section_id;
    this.riverSections = this.allRiverSections
      // tslint:disable-next-line:triple-equals
      .filter((riverSection: RiverSection) => riverSection.river_id == river_id);
    this.measuringPoints = this.allMeasuringPoints.filter((point: MeasuringPoint) =>
      // tslint:disable-next-line:triple-equals
      point.river_section_id == river_section_id);

    this.riverSelect.nativeElement.value = river_id;
    this.riverSectionSelect.nativeElement.value = river_section_id;
  }
}
