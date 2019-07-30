import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableContent } from '../../../_models/table-content';
import { SpentCleaningSubstance } from '../../../_models';
import { SpentCleaningSubstancesService } from '../../../_services/spent-cleaning-substances.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Substance } from '../../../_models';
import * as moment from 'moment';
import { AppConstants } from '../../../app-constants';


@Component({
  selector: 'app-spent-cleaning-substances-table',
  templateUrl: './spent-cleaning-substances-table.component.html',
  providers: [MessageService]
})
export class SpentCleaningSubstancesTableComponent extends TableContent<SpentCleaningSubstance> {
  public spentCleaningSubstances: SpentCleaningSubstance[];
  constructor(
    private readonly spentCleaningSubstancesService: SpentCleaningSubstancesService,
    private readonly modalService: BsModalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super(spentCleaningSubstancesService, modalService, router, activatedRoute);
  }

  protected onComponentInit() {
    library.add(faPlus);
    // this.getItems();
    const spentCleaningSubstance = {
      id: 1,
      date: new Date(),
      substances: [
        { substance: new Substance(1, 'Substance1'), count: 5 },
        { substance: new Substance(2, 'Substance2'), count: 5 },
        { substance: new Substance(3, 'Substance3'), count: 5 }
      ],
    };
    this.spentCleaningSubstances = [spentCleaningSubstance, spentCleaningSubstance, spentCleaningSubstance];
  }

  public setItems(_spentCleaningSubstances: SpentCleaningSubstance[]) {
    this.spentCleaningSubstances = _spentCleaningSubstances;
  }

  public convertDate(dateTime: Date): string {
    return moment(dateTime).toDate().toLocaleString(AppConstants.LOCALE, AppConstants.DATE_OPTIONS);
  }
}
