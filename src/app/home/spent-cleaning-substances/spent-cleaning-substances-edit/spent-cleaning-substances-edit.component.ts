import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { EditContent } from '../../../_models/edit-content';
import { SpentCleaningSubstance } from '../../../_models/spent-cleaning-substance';
import { SpentCleaningSubstancesService } from '../../../_services/spent-cleaning-substances.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CleaningSubstance } from 'src/app/_models/cleaning-substance';
import { Substance } from '../../../_models';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-spent-cleaning-substances-edit',
  templateUrl: './spent-cleaning-substances-edit.component.html',
  providers: [MessageService]
})
export class SpentCleaningSubstancesEditComponent extends EditContent<SpentCleaningSubstance> {
  allCleaningSubstances: Substance[];
  selectedCleaningSubstances: CleaningSubstance[];

  constructor(
    private readonly location: Location,
    private readonly spentCleaningSubstancesService: SpentCleaningSubstancesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly modalService: BsModalService
  ) {
    super(location, spentCleaningSubstancesService, activatedRoute, messageService, modalService);
  }

  protected onComponentInit() {
    library.add(faPencilAlt, faPlus);
    this.selectedCleaningSubstances = [];
    this.allCleaningSubstances = [new Substance(1, 'Substance1'), new Substance(2, 'Substance2')];
  }

  protected buildForm(): FormGroup {
    return this.formBuilder.group({
      date: [null, [Validators.required]],
      substances: [null]
    });
  }

  protected onEditScreenOpened(spentCleaningSubstance: SpentCleaningSubstance) {

  }

  protected beforeSubmit(): void {
    this.editForm.get('substances').setValue(this.selectedCleaningSubstances);
    console.log(this.editForm);
  }

  addCleaningSubstance(substance: any, count: number) {
    this.selectedCleaningSubstances.push({ substance, count });
    console.log(this.selectedCleaningSubstances);

    this.closeModal();
  }
}
